const reducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'new chat':
      return {
        history: [
          {
            conversationId: action.payload.conversationId,
            title: 'New Chat',
          },
          ...state.history,
        ],
        data: [
          { conversationId: action.payload.conversationId, messages: [] },
          ...state.data,
        ],
      }
    case 'new message':
      const idx = state.data.findIndex(
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

export default reducer
