import { Box } from '@mui/material'
import './App.css'

import SideBar from './components/SideBar'
import InputBar from './components/InputBar'
import MessageBox from './components/MessageBox'

function App() {
  return (
    <div id="app">
      <Box id="nav">
        <SideBar />
      </Box>
      <Box id="main">
        <MessageBox />
        <InputBar />
      </Box>
    </div>
  )
}

export default App
