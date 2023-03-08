import { useRef, useContext, useMemo, useEffect } from 'react'
import {
  Box,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Typography,
} from '@mui/material'
import './index.css'

import { StoreContext } from '@/store'

// IMG
import SONCE_AVATAR from '@/assets/sonce.jpg'
import OPENAI_AVATAR from '@/assets/openai.svg'

export default function MessageBox() {
  const [state, dispatch] = useContext(StoreContext)
  const messageList = useMemo(() => state.data[0].messages, [state])

  const messageEnd = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageEnd && messageEnd.current) {
        messageEnd.current.scrollIntoView({ behavior: 'auto' })
      }
    }, 0)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  const isReverse = (idx: any) => {
    return messageList[idx].id ? '' : ' reverse-message-item'
  }
  return (
    <Box className="overflow-y-auto overflow-x-auto h-100vh scrollbar">
      <List>
        {messageList.map((message, idx) => (
          <ListItem
            key={idx}
            alignItems="flex-start"
            className={'min-w-700px' + isReverse(idx)}
          >
            <ListItemAvatar className={isReverse(idx)}>
              <Avatar src={message.id ? OPENAI_AVATAR : SONCE_AVATAR} />
            </ListItemAvatar>
            <ListItemText
              className={'ws-pre-wrap flex max-w-750px' + isReverse(idx)}
            >
              <Paper
                className={message.id ? 'mr-56px' : 'ml-56px'}
                sx={{ backgroundColor: message.id ? '#FFF' : '#DFFFE2' }}
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
  )
}
