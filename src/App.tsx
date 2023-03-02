import { useState, useRef } from 'react'
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
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import setApiKey from './api/setApiKey'
import SideBar from './components/SideBar'

// IMG
import SONCE_AVATAR from './assets/sonce.jpg'
import OPENAI_AVATAR from './assets/openai.svg'

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

  const handleSetApiKey = (apiKey: string) => {
    setApiKey(apiKey).then((res) => {
      console.log(res)
    })
  }

  return (
    <div className="overflow-hidden h-100vh" id="app">
      <Box
        className="flex fixed h-100vh w-300px bg-white border-r-solid border-1 border-#BED9C0 z-2"
        id="nav"
      >
        <SideBar />
      </Box>
      <Box id="main">
        <Box className="overflow-y-auto overflow-x-auto h-100vh scrollbar">
          <List>
            {messageList.map((message, idx) => (
              <ListItem
                key={idx}
                alignItems="flex-start"
                className={'min-w-700px' + isReverse(idx)}
              >
                <ListItemAvatar className={isReverse(idx)}>
                  <Avatar src={idx % 2 ? OPENAI_AVATAR : SONCE_AVATAR} />
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
          <div ref={messageEnd} className="h-8vh" />
        </Box>
        <Box className="relative">
          <Box className="flex absolute bottom-0 z-1 bg-#FFF p-8px w-1/1">
            <TextField
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              autoFocus={true}
              onKeyDown={handleEnterKey}
              fullWidth={true}
            />
            <Button
              onClick={handleSendMessage}
              startIcon={<SendIcon className="rotate--45 p-0" />}
              sx={{ padding: 0 }}
              disabled={!!(sending || !textInput)}
            ></Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default App
