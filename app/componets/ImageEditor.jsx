'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, ImageIcon, Download, Loader } from 'lucide-react'

export default function ImageEditor() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result)
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !preview) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: preview.split(',')[1],
          numberOfImages: 1,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate image. Status: ${response.status}`)
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.images || data.images.length === 0) {
        throw new Error('No images generated')
      }

      setGeneratedImage(`data:image/png;base64,${data.images[0]}`)
    } catch (error) {
      setError(error.message || 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-8 space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400">
        AI Image Enhancer
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className='flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg'>
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {preview && (
            <ImagePreview title="Original Image" image={preview} />
          )}
          {generatedImage && (
            <ImagePreview title="Enhanced Image" image={generatedImage} />
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            disabled={!file || isLoading}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-white shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }`}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin mr-2" size={20} />
                <span className='animate-pulse'>Enhancing...</span>
              </>
            ) : (
              <>
                <ImageIcon className="mr-2" size={20} />
                Enhance Image
              </>
            )}
          </button>
          {generatedImage && (
            <button
              type='button'
              onClick={() => {
                const link = document.createElement('a')
                link.href = generatedImage
                link.download = 'enhanced-image.png'
                link.click()
              }}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Download className="mr-2" size={20} />
              Download Enhanced Image
            </button>
          )}
        </div>
      </form>
      {error && (
        <div className="mt-4 text-red-500 text-sm text-center">
          Error: {error}
        </div>
      )}
    </div>
  )
}

function ImagePreview({ title, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <div className="relative pb-[100%] rounded-lg shadow-md overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </motion.div>
  )
}

