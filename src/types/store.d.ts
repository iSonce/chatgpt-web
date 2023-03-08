type Store = [state: ChatState, dispatch: React.Dispatch<ChatAction>]

type ChatAction =
  | {
      type: 'new chat'
      payload: any
    }
  | {
      type: 'new message'
      payload: {
        message: Message
        conversationId: string
      }
    }
