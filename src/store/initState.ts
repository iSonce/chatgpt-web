import { v4 as uuidv4 } from 'uuid'
import example from '@/common/example'
const conversationId = uuidv4()

let initState: ChatState
let localStorage = window.localStorage.getItem('chatStorage')
if (localStorage !== null) {
  initState = JSON.parse(localStorage)
} else {
  initState = {
    history: [
      {
        conversationId,
        title: 'New Chat',
      },
    ],
    data: [
      {
        conversationId,
        messages: example,
      },
    ],
  }
}

export default initState
