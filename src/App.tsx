import { Box } from '@mui/material'
import './App.css'

import SideBar from './components/SideBar'
import InputBar from './components/InputBar'
import MessageBox from './components/MessageBox'

import { useParams } from 'react-router-dom'
import { useMemo, useContext } from 'react'
import { StoreContext } from './store'

function App() {
  const [state, dispatch] = useContext(StoreContext)

  // get conversationId from path and use it to get conversationIndex
  const { conversationId } = useParams()
  // add message will cause conversationIndex change
  const conversationIndex = useMemo(() => {
    if (!!!conversationId) {
      return 0
    }
    return state.data.findIndex((item) => {
      return item.conversationId === conversationId
    })
  }, [conversationId, state])

  const messageList = useMemo(() => {
    return state.data[conversationIndex].messages
  }, [state.data, conversationIndex])

  const historyList = useMemo(() => {
    return state.history
  }, [state.history])

  return (
    <div id="app">
      <Box id="nav">
        <SideBar historyList={historyList} />
      </Box>
      <Box id="main">
        <MessageBox messageList={messageList} />

        {/* TODO: use conversationIndex instead of conversationId to reduce findIndex function call */}
        <InputBar
          // conversationIndex={conversationIndex}
          conversationId={state.data[conversationIndex].conversationId}
        />
      </Box>
    </div>
  )
}

export default App
