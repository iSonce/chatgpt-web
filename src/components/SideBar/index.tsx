import { Button, Box, Avatar, List, ListItem } from '@mui/material'
import React, { useContext } from 'react'
import SONCE_AVATAR from '@/assets/sonce.jpg'
import { StoreContext } from '@/store'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, Link } from 'react-router-dom'

type props = {
  historyList: ChatHistory[]
}

// TODO: UI optimize, delete conversation, edit title 
function SideBar({ historyList }: props) {
  const [state, dispatch] = useContext(StoreContext)

  const navgate = useNavigate()

  const handleNewChat = () => {
    const newConversationId = uuidv4()
    dispatch({
      type: 'new chat',
      payload: {
        conversationId: newConversationId,
      },
    })
    navgate(`/chat/${newConversationId}`)
  }

  return (
    <nav className="flex flex-col p-10px flex-1">
      <Button variant="outlined" fullWidth={true} onClick={handleNewChat}>
        + new chat
      </Button>
      <Box className="flex-1">
        <List>
          {historyList.map((item) => (
            <ListItem key={item.conversationId} sx={{ padding: 0 }}>
              <Box className="w-1/1 mb-2">
                <Button
                  variant="outlined"
                  fullWidth={true}
                  onClick={() => {
                    navgate(`/chat/${item.conversationId}`)
                  }}
                >
                  {item.title}
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="flex">
        <Avatar src={SONCE_AVATAR}></Avatar>
      </Box>
    </nav>
  )
}
export default React.memo(SideBar)
