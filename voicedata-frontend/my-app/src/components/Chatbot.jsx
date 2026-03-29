import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        messages: updatedMessages
      })
      setMessages([...updatedMessages, { role: 'assistant', content: res.data.reply }])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chatbot-wrapper">

      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-bot-avatar">🤖</div>
          <div>
            <h3 className="chatbot-header-title">AI Assistant</h3>
            <div className="chatbot-header-sub">
              <span className="chatbot-online-dot" />
              Online • Ready to help
            </div>
          </div>
        </div>
        <div className="chatbot-header-badge">Bot AI</div>
      </div>

      {/* Messages */}
      <div className="chatbot-messages">

        {messages.length === 0 && (
          <div className="chatbot-empty">
            <div className="chatbot-empty-icon">✨</div>
            <p className="chatbot-empty-title">Hey! How can I help You?</p>
            <p className="chatbot-empty-sub">Ask me anything!</p>
            <div className="chatbot-suggestions">
              {['Entries summarize karo', 'Aaj ki entries kitni hain?', 'Help chahiye'].map((s, i) => (
                <button key={i} className="chatbot-suggestion-btn" onClick={() => setInput(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`chatbot-msg-row ${msg.role === 'user' ? 'user' : 'ai'}`}>
            <div className={`chatbot-msg-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`chatbot-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="chatbot-msg-row ai">
            <div className="chatbot-msg-avatar ai">🤖</div>
            <div className="chatbot-bubble ai">
              <div className="chatbot-typing">
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chatbot-input-area">
        <div className="chatbot-input-box">
          <input
            className="chatbot-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message here..."
            disabled={loading}
          />
          <button
            className={`chatbot-send-btn ${loading ? 'disabled' : 'active'}`}
            onClick={sendMessage}
            disabled={loading}
          >
            🚀
          </button>
        </div>
     
      </div>

    </div>
  )
}

export default Chatbot