'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MessageSquare } from 'lucide-react'

interface Message {
  id: string
  text: string
  timestamp: Date
}

interface CommandPanelProps {
  onCommand: (command: string) => void
}

export function CommandPanel({ onCommand }: CommandPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Generate Q3 financial report for subsidiary division',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: '2',
      text: 'Check inventory levels across all warehouses',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '3',
      text: 'Analyze sales trends for product category',
      timestamp: new Date(Date.now() - 25 * 60000),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: input,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      onCommand(input)
      setInput('')
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-semibold text-slate-100">Command Center</h2>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="group">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400/60 mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-200 break-words leading-relaxed">
                  {msg.text}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter business command..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all"
            />
            {input && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-amber-400 animate-pulse" />
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 rounded bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            title="Send command"
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all duration-200"
            title="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
