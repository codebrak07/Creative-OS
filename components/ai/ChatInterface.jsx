import { useState, useRef, useEffect } from 'react'
import styles from './ChatInterface.module.css'

// ── STREAMING TEXT DISPLAY ─────────────────────────────────
function Message({ role, content, streaming = false }) {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <div className={styles.messageContent}>
        {content}
        {streaming && <span className={styles.cursor} aria-hidden="true" />}
      </div>
    </div>
  )
}

// ── THINKING INDICATOR ─────────────────────────────────────
function ThinkingIndicator() {
  return (
    <div className={styles.thinking} aria-label="AI is thinking">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  )
}

// ── PROMPT INPUT ───────────────────────────────────────────
function PromptInput({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const autoGrow = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 240) + 'px'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        onSend(value.trim())
        setValue('')
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
      }
    }
  }

  return (
    <div className={styles.inputWrap}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => { setValue(e.target.value); autoGrow() }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Send a message" // cos-ignore
        rows={1}
        className={styles.input}
        aria-label="Message input"
      />
      <div className={styles.inputMeta}>
        <span className={`${styles.charCount} ${value.length > 3200 ? styles.charWarn : ''}`}>
          {value.length > 2800 ? `${value.length} / 4000` : ''}
        </span>
        <button
          className={styles.sendBtn}
          onClick={() => {
            if (value.trim()) {
              onSend(value.trim())
              setValue('')
              if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
              }
            }
          }}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          ↑
        </button>
      </div>
    </div>
  )
}

// ── MAIN INTERFACE ─────────────────────────────────────────
export function ChatInterface({ onSend, messages = [], thinking = false }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content}
            streaming={i === messages.length - 1 && msg.role === 'assistant' && thinking}
          />
        ))}
        {thinking && messages[messages.length - 1]?.role !== 'assistant' && (
          <ThinkingIndicator />
        )}
        <div ref={bottomRef} />
      </div>
      <PromptInput onSend={onSend} disabled={thinking} />
    </div>
  )
}
