"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react"
import Image from "next/image"

interface ImageAnalyzerProps {
  imageUrl: string
  onBack: () => void
}

export default function ImageAnalyzer({ imageUrl, onBack }: ImageAnalyzerProps) {
  const [analysis, setAnalysis] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    analyzeImage(imageUrl)
  }, [imageUrl])

  const analyzeImage = async (url: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: url }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const data = await response.json()
      setAnalysis(data.report || data.error)

    } catch (err) {
      setError("Failed to analyze image. Please check the URL and try again.")
      console.error("Analysis error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="mb-4 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Main
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="mr-3 h-8 w-8 text-red-600" />
            Emergency Response Analysis
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Image */}
          <Card>
            <CardHeader>
              <CardTitle>Input Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="Landscape image for emergency response analysis"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 break-all">{imageUrl}</p>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px]">
                {loading && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                      <p className="text-gray-600">Analyzing image for emergency response...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-red-600">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-4" />
                      <p>{error}</p>
                    </div>
                  </div>
                )}

                {analysis && !loading && (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{analysis}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={onBack} size="lg" className="px-8">
            Try Another Image
          </Button>
        </div>
      </div>
    </div>
  )
}
