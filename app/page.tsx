"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, AlertTriangle } from "lucide-react"
import ImageAnalyzer from "./components/image-analyzer"

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [showAnalyzer, setShowAnalyzer] = useState(false)

  const handleAnalyze = () => {
    if (imageUrl.trim()) {
      setShowAnalyzer(true)
    }
  }

  const handleBackToMain = () => {
    setShowAnalyzer(false)
    setImageUrl("")
  }

  if (showAnalyzer && imageUrl) {
    return <ImageAnalyzer imageUrl={imageUrl} onBack={handleBackToMain} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Emergency Response Analyzer</CardTitle>
          <CardDescription className="text-gray-600">
            Enter a landscape image URL to get AI-powered analysis of buildings, roads, and infrastructure for emergency
            response planning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/landscape-image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Link className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Paste the URL of a landscape image showing buildings, roads, or infrastructure
              </p>
            </div>
            <Button onClick={handleAnalyze} className="w-full" size="lg" disabled={!imageUrl.trim()}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Start Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}