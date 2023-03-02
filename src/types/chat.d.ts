interface Message {
  text: string
  id?: string
}

interface ChatContext {
  conversationId?: string
  parentMessageId?: string
}

interface ChatHistory {
  conversationId: string
  title: string
}

interface ChatData {
  conversationId: string
  messages: Message[]
}

interface ChatState {
  history: ChatHistory[]
  data: ChatData[]
}

interface ChatAction {
  type: 'new chat'
}
