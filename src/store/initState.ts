import { v4 as uuidv4 } from 'uuid'
import example from '@/common/example'
const conversationId = uuidv4()

// 从localStorage里读是否有之前的数据

export const initState: ChatState = {
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