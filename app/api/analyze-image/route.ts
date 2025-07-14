// import { type NextRequest, NextResponse } from "next/server"
// import { generateText } from "ai"
// import { openai } from "@ai-sdk/openai"

// export async function POST(request: NextRequest) {
//   try {
//     // Validate API key is available
//     if (!process.env.OPENAI_API_KEY) {
//       return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
//     }

//     const { imageUrl } = await request.json()

//     if (!imageUrl) {
//       return NextResponse.json({ error: "No image URL provided" }, { status: 400 })
//     }

//     // Analyze the image using OpenAI - this matches your original code structure
//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "text",
//               text: "Analyze the image for emergency response. Report buildings: collapsed, damaged, safe; roads: blocked or clear; critical infrastructure status. Suggest top priorities and actions.",
//             },
//             {
//               type: "image",
//               image: imageUrl,
//             },
//           ],
//         },
//       ],
//     })

//     return NextResponse.json({ analysis: text })
//   } catch (error) {
//     console.error("Error analyzing image:", error)
//     return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
//   }
// }

// app/api/analyze/route.ts
// app/api/analyze-image/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { imageUrl } = await request.json()

  if (!imageUrl) {
    return NextResponse.json({ error: "No image URL provided" }, { status: 400 })
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze the image for emergency response. Report buildings: collapsed, damaged, safe; roads: blocked or clear; critical infrastructure status. Suggest top priorities and actions.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      }),
    })

    const result = await openaiRes.json()
    const analysis = result.choices?.[0]?.message?.content || "No report generated."

    return NextResponse.json({ report: analysis })
  } catch (error) {
    console.error("GPT-4o error:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}
