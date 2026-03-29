import Groq from 'groq-sdk'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export const sendMessage = async (req, res) => {
  try {
    const { messages } = req.body

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
  role: "system", 
  content: "You are a helpful assistant. Detect the language of each user message and reply strictly in that exact same language only. Do not mix languages." 
},
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    res.json({ reply: response.choices[0].message.content })

  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Kuch galat ho gaya!" })
  }
}