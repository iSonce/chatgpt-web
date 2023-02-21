interface Message {
  text: string
  id?: string
}

interface ChatContext {
  conversationId?: string
  parentMessageId?: string
}