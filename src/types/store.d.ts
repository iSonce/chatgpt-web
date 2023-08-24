type Store = [state: ChatState, dispatch: React.Dispatch<ChatAction>]

type ChatAction =
  | {
      type: 'new chat'
      payload: {
        conversationId: string
      }
    }
  | {
      type: 'new message'
      payload: {
        // conversationIndex: number
        message: Message
        conversationId: string
      }
    }
  | {
      type: 'delete chat'
      payload: {
        conversationId: string
      }
    }
  | {
      type: 'edit title'
      payload: {
        conversationId: string
        newTitle: string
      }
    }
