import { TextareaHTMLAttributes, useRef, useState } from 'react'
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
  Paper,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './App.css'
import { v4 as uuidv4 } from 'uuid'

const SONCE_AVATARS = import.meta.env.VITE_APP_SONCE_AVATARS_URL
const OPENAI_AVATARS = import.meta.env.VITE_APP_OPENAI_AVATARS_URL

function App() {
  const [textInput, setTextInput] = useState<string>('')
  const [messageList, setMessageList] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string>(uuidv4())
  const [sending, setSending] = useState<Boolean>(false)

  const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (textInput === '') {
      alert('please input your message text!')
      return
    }
    setTextInput('')
    setSending(true)

    let text: string = textInput
    let options: ChatContext = {
      conversationId,
      parentMessageId:
        messageList.length === 0
          ? undefined
          : messageList[messageList.length - 1].id,
    }
    setMessageList((pre) => [...pre, { text }])

    chat(text, options)
      .then((msg) => {
        setMessageList((pre) => [...pre, msg])
      })
      .finally(() => {
        setSending(false)
      })
  }

  const isReverse = (idx: any) => {
    return idx % 2 ? '' : ' reverse-container'
  }

  return (
    <div className="overflow-hidden" id="app">
      <Box className="overflow-y-auto overflow-x-hidden h-92vh scrollbar">
        <List>
          {messageList.map((message, idx) => (
            <ListItem
              key={idx}
              alignItems="flex-start"
              className={'min-w-550px' + isReverse(idx)}
            >
              <ListItemAvatar className={isReverse(idx)}>
                <Avatar src={idx % 2 ? OPENAI_AVATARS : SONCE_AVATARS} />
              </ListItemAvatar>
              <ListItemText
                className={'ws-pre-wrap flex max-w-600px' + isReverse(idx)}
              >
                <Paper
                  className={'p-0.5rem'}
                  sx={{ backgroundColor: idx % 2 ? '#FFF' : '#DFFFE2' }}
                >
                  {message.text}
                </Paper>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="flex absolute bottom-0 z-100 bg-#FFF p-1/100 w-100vw">
        <TextField
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          autoFocus={true}
          onKeyDown={handleEnterKey}
          fullWidth={true}
          sx={{ borderColor: '#000' }}
          disabled={!!sending}
        />
        <Button
          className="absolute bottom-0"
          onClick={handleSendMessage}
          startIcon={<SendIcon className="rotate--45 p-0" />}
          sx={{ padding: 0 }}
          disabled={!!(sending || !textInput)}
        ></Button>
      </Box>
    </div>
  )
}

export default App
