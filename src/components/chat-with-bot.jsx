import { useState, useRef, useEffect } from "react"
import { Send } from "@mui/icons-material"
import { Button, TextField, Card, CardContent, Typography, Box, Divider } from "@mui/material"

export function ChatWithBot({ onComplete }) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hi there! I'm the hiring assistant. I'd like to ask you a few questions about your experience and skills. Let's start: What role are you applying for?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const messagesEndRef = useRef(null)

  const questions = [
    "Great! Can you tell me about your experience with that role?",
    "What programming languages or technologies are you most comfortable with?",
    "Can you describe a challenging project you've worked on?",
    "What are you looking for in your next position?",
    "Do you have any questions about the role or our company?",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    // Simulate bot typing
    setIsTyping(true)
    setTimeout(() => {
      // Add bot response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: questions[questionCount],
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, botMessage])
      setIsTyping(false)
      setQuestionCount((prevCount) => prevCount + 1)

      // Check if all questions have been asked
      if (questionCount === questions.length - 1) {
        onComplete()
      }
    }, 1000)
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ height: "400px", overflowY: "auto", mb: 2 }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Card
                sx={{
                  maxWidth: "70%",
                  bgcolor: message.sender === "user" ? "primary.main" : "secondary.main",
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="body1">{message.content}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
          {isTyping && (
            <Typography variant="body2" sx={{ fontStyle: "italic", color: "text.secondary" }}>
              Bot is typing...
            </Typography>
          )}
          <div ref={messagesEndRef} />
        </Box>
        <Divider />
        <Box component="form" onSubmit={handleSendMessage} sx={{ display: "flex", mt: 2 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
          />
          <Button type="submit" variant="contained" endIcon={<Send />} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}