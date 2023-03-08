import { v4 as uuidv4 } from 'uuid'
export const reducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'new chat':
      const conversationId = uuidv4()
      return {
        history: [
          {
            conversationId,
            title: 'new chat',
          },
          ...state.history,
        ],
        data: [{ conversationId, messages: [] }, ...state.data],
      }
    case 'new message':
      let idx = state.data.findIndex(
        (item) => item.conversationId === action.payload.conversationId
      )
      return {
        history: state.history,
        data: [
          {
            conversationId: action.payload.conversationId,
            messages: [...state.data[idx].messages, action.payload.message],
          },
          ...state.data.filter(
            (item) => item.conversationId !== action.payload.conversationId
          ),
        ],
      }
    default:
      return state
  }
}
