import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

const conversationId = uuidv4()
const initState: ChatState = {
  history: [
    {
      conversationId,
      title: 'New Chat',
    },
  ],
  data: [
    {
      conversationId,
      messages: [],
    },
  ],
}
const reducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'new chat':
      return state
    default:
      return state
  }
}
const [state, dispatch] = useReducer(reducer, initState)

const store = {
  state,
  dispatch,
}

export default store
