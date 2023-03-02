import { Button, Box, Avatar } from '@mui/material'
import React from 'react'
import SONCE_AVATAR from '@/assets/sonce.jpg'

function SideBar() {
  return (
    <nav className="flex flex-col p-10px flex-1">
      <Button variant="outlined" fullWidth={true}>
        + new chat
      </Button>
      <Box className="flex-1"></Box>
      <Box className="flex">
        <Avatar src={SONCE_AVATAR}></Avatar>
      </Box>
    </nav>
  )
}
export default React.memo(SideBar)
