import { useState, useContext } from 'react'
import { TextField, Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import chat from '@/api/chat'

import { StoreContext } from '@/store'

export default function InputBar() {
  const [state, dispatch] = useContext(StoreContext)
  const [textInput, setTextInput] = useState<string>('')
  const [sending, setSending] = useState<Boolean>(false)
  const [parentMessageId, setParentMessageId] = useState<string | undefined>(
    undefined
  )

  const conversationId = state.data[0].conversationId

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
      parentMessageId,
    }
    dispatch({
      type: 'new message',
      payload: {
        conversationId,
        message: {
          text,
        },
      },
    })

    chat(text, options)
      .then((res) => {
        if (res.data.status !== 'Success') {
          throw Error(res.data.message)
        }
        const msg: Message = {
          text: res.data.data.text,
          id: res.data.data.id,
        }
        dispatch({
          type: 'new message',
          payload: {
            conversationId,
            message: msg,
          },
        })
        setParentMessageId(msg.id)
      })
      .catch((err: any) => {
        console.log(err)
      })
      .finally(() => {
        setSending(false)
      })
  }
  return (
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
  )
}
