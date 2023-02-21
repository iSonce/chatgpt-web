import { useState, useRef } from 'react'
import axios from 'axios'

interface Message {
  text: string
  id?: string
}

function App() {
  const [messageList, setMessageList] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string>(
    crypto.randomUUID()
  )

  const inputEl = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (inputEl.current === null) {
      return
    }
    if (inputEl.current.value === '') {
      alert('please input your text!')
      return
    }
    let text = inputEl.current.value
    let parentMessageId =
      messageList.length === 0
        ? undefined
        : messageList[messageList.length - 1].id
    setMessageList((pre) => [...pre, { text }])
    axios
      .post('/api/chat', {
        prompt: text,
        options: {
          conversationId,
          parentMessageId,
        },
      })
      .then((res) => res.data.data)
      .then((data) => {
        let msg: Message = {
          text: data.text,
          id: data.id,
        }
        setMessageList((pre) => [...pre, msg])
      })
    inputEl.current.value = ''
  }
  return (
    <div className="App">
      <div>
        <input type="text" ref={inputEl} />
        <button onClick={handleSendMessage}>send</button>
        <button
          onClick={() => {
            setMessageList([])
            setConversationId(crypto.randomUUID())
          }}
        >
          clear
        </button>
      </div>
      <div>
        {messageList.map((message, idx) => (
          <div
            dangerouslySetInnerHTML={{
              __html: message.text.replace(/\n/g, '<br />'),
            }}
            className="whitespace-pre"
            key={idx}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App
