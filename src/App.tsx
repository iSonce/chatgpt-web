import { useState, useRef } from 'react'
import chat from './api/chat'

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
      alert('please input your message text!')
      return
    }

    let text: string = inputEl.current.value
    let options: ChatContext = {
      conversationId,
      parentMessageId:
        messageList.length === 0
          ? undefined
          : messageList[messageList.length - 1].id,
    }
    setMessageList((pre) => [...pre, { text }])

    chat(text, options).then((msg) => {
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
