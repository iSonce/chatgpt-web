import { useState, useRef } from 'react'
import chat from './api/chat'
import example from './common/example'
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
  Typography,
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
  const [parentMessageId, setParentMessageId] = useState<string | undefined>(
    undefined
  )

  const messageEnd = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageEnd && messageEnd.current) {
        messageEnd.current.scrollIntoView({ behavior: 'auto' })
      }
    }, 0)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (sending) {
      return
    }
    if (textInput === '') {
      alert('please input your message text!')
      return
    }
    setTextInput('')
    setSending(true)

    let text: string = textInput
    let options: ChatContext = {
      conversationId,
      parentMessageId,
    }
    setMessageList((pre) => [...pre, { text }])
    scrollToBottom()

    chat(text, options)
      .then((msg) => {
        setMessageList((pre) => [...pre, msg])
        setParentMessageId(msg.id)
      })
      .finally(() => {
        setSending(false)
        scrollToBottom()
      })
  }

  const isReverse = (idx: any) => {
    return messageList[idx].id ? '' : ' reverse-message-item'
  }

  return (
    <div className="overflow-hidden" id="app">
      <Box className="overflow-y-auto overflow-x-auto h-92vh scrollbar">
        <List>
          {messageList.map((message, idx) => (
            <ListItem
              key={idx}
              alignItems="flex-start"
              className={'min-w-700px' + isReverse(idx)}
            >
              <ListItemAvatar className={isReverse(idx)}>
                <Avatar src={idx % 2 ? OPENAI_AVATARS : SONCE_AVATARS} />
              </ListItemAvatar>
              <ListItemText
                className={'ws-pre-wrap flex max-w-750px' + isReverse(idx)}
              >
                <Paper
                  className={idx % 2 ? 'mr-56px' : 'ml-56px'}
                  sx={{ backgroundColor: idx % 2 ? '#FFF' : '#DFFFE2' }}
                >
                  <Typography className="p-0.6rem" variant={'body2'}>
                    {message.text}
                  </Typography>
                </Paper>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <div ref={messageEnd} />
      </Box>

      <Box className="flex absolute bottom-0 z-100 bg-#FFF p-4px w-100vw h-60px">
        <TextField
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          autoFocus={true}
          onKeyDown={handleEnterKey}
          fullWidth={true}
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
