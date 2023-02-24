import { useState } from 'react'
import chat from './api/chat'
// import example from './common/example'
import {
  TextField,
  Box,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './App.css'

const SONCE_AVATARS = import.meta.env.VITE_APP_SONCE_AVATARS_URL
const OPENAI_AVATARS = import.meta.env.VITE_APP_OPENAI_AVATARS_URL

function App() {
  const [textInput, setTextInput] = useState<string>('')
  const [messageList, setMessageList] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string>(
    crypto.randomUUID()
  )

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (textInput === '') {
      alert('please input your message text!')
      return
    }

    let text: string = textInput
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

    setTextInput('')
  }
  return (
    <div className="overflow-hidden" id="app">
      <Box className="overflow-y-auto h-92vh scrollbar">
        <List>
          {messageList.map((message, idx) => (
            <ListItem key={idx} alignItems="flex-start" className="min-w-600px">
              <ListItemAvatar>
                <Avatar src={idx % 2 ? OPENAI_AVATARS : SONCE_AVATARS} />
              </ListItemAvatar>
              <ListItemText className="ws-pre-wrap">
                {message.text}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="flex absolute bottom-0 z-100 bg-#FFF p-1/100 w-100vw h-8vh">
        <TextField
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          fullWidth={true}
          onKeyDown={handleEnterKey}
        />
        <Button
          onClick={handleSendMessage}
          startIcon={<SendIcon className="rotate--45" />}
        ></Button>
      </Box>
    </div>
  )
}

export default App
