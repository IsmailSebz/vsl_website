'use client'
import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Video, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import imageCompression from 'browser-image-compression'

const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024  // 5 MB
const VIDEO_SIZE_LIMIT = 50 * 1024 * 1024 // 50 MB

/**
 * MediaUploader
 * Props:
 *   onUploadComplete(url, type) — called with the final CDN URL and 'image' | 'video'
 *   accept — e.g. 'image/*' | 'video/*' | 'image/*,video/*'
 *   folder — 'images' | 'videos'
 */
export default function MediaUploader({ onUploadComplete, accept = 'image/*,video/*', folder = 'images' }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [stage, setStage] = useState('idle') // idle | compressing | uploading | done | error
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [pendingSubmit, setPendingSubmit] = useState(false)
  const videoWorkerRef = useRef(null)
  const inputRef = useRef(null)

  // ── File selection ────────────────────────────────────────────────────────
  const handleFileSelect = useCallback(async (selectedFile) => {
    if (!selectedFile) return
    setFile(selectedFile)
    setStage('idle')
    setErrorMsg('')
    setProgress(0)

    // Preview
    const url = URL.createObjectURL(selectedFile)
    setPreview({ url, type: selectedFile.type.startsWith('video') ? 'video' : 'image' })

    // Start background processing immediately
    if (selectedFile.type.startsWith('image/') && selectedFile.size > IMAGE_SIZE_LIMIT) {
      compressImage(selectedFile)
    } else if (selectedFile.type.startsWith('video/') && selectedFile.size > VIDEO_SIZE_LIMIT) {
      compressVideo(selectedFile)
    }
  }, [])

  // ── Image compression ─────────────────────────────────────────────────────
  const compressImage = async (original) => {
    setStage('compressing')
    try {
      const compressed = await imageCompression(original, {
        maxSizeMB: 4.5,
        maxWidthOrHeight: 2560,
        useWebWorker: true,
        onProgress: (p) => setProgress(p),
      })
      setFile(compressed)
      setStage('idle')
      setProgress(0)
    } catch (e) {
      setErrorMsg('Image compression failed. Will upload original.')
      setStage('idle')
    }
  }

  // ── Video compression via FFmpeg-wasm ─────────────────────────────────────
  const compressVideo = async (original) => {
    setStage('compressing')
    try {
      // Dynamically import FFmpeg to avoid bundle bloat
      const { FFmpeg } = await import('@ffmpeg/ffmpeg')
      const { fetchFile, toBlobURL } = await import('@ffmpeg/util')

      const ffmpeg = new FFmpeg()
      ffmpeg.on('progress', ({ progress: p }) => setProgress(Math.round(p * 100)))

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      const ext = original.name.split('.').pop() || 'mp4'
      await ffmpeg.writeFile(`input.${ext}`, await fetchFile(original))
      await ffmpeg.exec([
        '-i', `input.${ext}`,
        '-vf', 'scale=-2:720',
        '-c:v', 'libx264',
        '-crf', '28',
        '-preset', 'fast',
        '-c:a', 'aac',
        '-b:a', '128k',
        'output.mp4',
      ])
      const data = await ffmpeg.readFile('output.mp4')
      const blob = new Blob([data.buffer], { type: 'video/mp4' })
      const compressed = new File([blob], original.name.replace(/\.[^.]+$/, '.mp4'), { type: 'video/mp4' })
      setFile(compressed)
      setStage('idle')
      setProgress(0)
    } catch (e) {
      console.error('Video compression error:', e)
      setErrorMsg('Video compression failed. Will upload original.')
      setFile(original)
      setStage('idle')
    }
  }

  // ── Upload ────────────────────────────────────────────────────────────────
  const upload = async (fileToUpload) => {
    setStage('uploading')
    setProgress(0)
    try {
      const ext = fileToUpload.name.split('.').pop() || 'bin'
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const key = `${folder}/${uniqueName}`

      // 1. Get presigned URL
      const res = await fetch('/api/admin/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, contentType: fileToUpload.type }),
      })
      const { uploadUrl, publicUrl } = await res.json()

      // 2. Upload directly to R2
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
        }
        xhr.onload = () => xhr.status === 200 ? resolve() : reject(new Error(`Upload failed: ${xhr.status}`))
        xhr.onerror = reject
        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', fileToUpload.type)
        xhr.send(fileToUpload)
      })

      setStage('done')
      const mediaType = fileToUpload.type.startsWith('video') ? 'video' : 'image'
      onUploadComplete?.(publicUrl, mediaType)
    } catch (err) {
      setStage('error')
      setErrorMsg(err.message || 'Upload failed.')
    }
  }

  const handleUploadClick = () => {
    if (!file) return
    if (stage === 'compressing') {
      setPendingSubmit(true)
      return
    }
    upload(file)
  }

  // When compression finishes and there's a pending upload, trigger it
  if (pendingSubmit && stage === 'idle' && file) {
    setPendingSubmit(false)
    upload(file)
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setStage('idle')
    setProgress(0)
    setErrorMsg('')
    setPendingSubmit(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      {!file ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-10 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all">
          <Upload size={32} className="text-gray-400 mb-3" />
          <p className="font-medium text-gray-600">Click to select or drag & drop</p>
          <p className="text-gray-400 text-sm mt-1">Images auto-compressed &gt;5 MB · Videos auto-compressed &gt;50 MB</p>
          <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFileSelect(e.target.files?.[0])} />
        </label>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Preview */}
          <div className="relative bg-gray-100 aspect-video">
            {preview?.type === 'video'
              ? <video src={preview.url} className="w-full h-full object-contain" controls={stage === 'idle' || stage === 'done'} />
              : <img src={preview.url} alt="Preview" className="w-full h-full object-contain" />
            }
            <button onClick={reset} className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70">
              <X size={14} />
            </button>
          </div>

          {/* File info + status */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {file.type.startsWith('video') ? <Video size={16} className="text-gray-400" /> : <ImageIcon size={16} className="text-gray-400" />}
              <span className="text-sm text-gray-600 truncate">{file.name}</span>
              <span className="text-xs text-gray-400 ml-auto flex-shrink-0">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
            </div>

            {/* Progress bar */}
            {(stage === 'compressing' || stage === 'uploading') && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>{stage === 'compressing' ? '🔄 Compressing in background…' : `⬆️ Uploading… ${progress}%`}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                {stage === 'compressing' && <p className="text-xs text-gray-400 mt-1">You can continue working. We'll upload when ready.</p>}
              </div>
            )}

            {stage === 'done' && (
              <div className="flex items-center gap-2 text-green-600 text-sm mb-3">
                <CheckCircle size={16} /> Uploaded successfully
              </div>
            )}

            {stage === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm mb-3">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}

            {errorMsg && stage === 'idle' && (
              <p className="text-amber-500 text-xs mb-3">⚠ {errorMsg}</p>
            )}

            {stage !== 'done' && (
              <button
                onClick={handleUploadClick}
                disabled={stage === 'uploading'}
                className="btn-primary w-full justify-center text-sm py-2"
              >
                {stage === 'uploading' ? <><Loader2 size={16} className="animate-spin" /> Uploading…</> :
                 stage === 'compressing' || pendingSubmit ? <><Loader2 size={16} className="animate-spin" /> Processing… (will upload when done)</> :
                 'Upload to R2'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
