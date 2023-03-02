import * as dotenv from 'dotenv'
import type { SendMessageOptions } from 'chatgpt'
import { ChatGPTAPI } from 'chatgpt'
import { sendResponse } from './utils'

export interface ChatContext {
  conversationId?: string
  parentMessageId?: string
}

dotenv.config({ path: '.env.local' })
dotenv.config()

const apiKey = process.env.OPENAI_API_KEY

if (apiKey === undefined) throw new Error('OPENAI_API_KEY is not defined')

/**
 * More Info: https://github.com/transitive-bullshit/chatgpt-api
 */
let api = new ChatGPTAPI({ apiKey, debug: false })

// TODO...
async function setApiKey(apiKey: string) {
  try {
    api = new ChatGPTAPI({ apiKey, debug: false })
    return sendResponse({ type: 'Success' })
  } catch (error: any) {
    return sendResponse({ type: 'Fail', message: error.message })
  }
}

async function chatReply(text: string, lastContext?: ChatContext) {
  if (!text) return sendResponse({ type: 'Fail', message: 'text is empty' })

  try {
    let options: SendMessageOptions = {}

    if (lastContext) options = { ...lastContext }

    const response = await api.sendMessage(text, { ...options })

    return sendResponse({ type: 'Success', data: response })
  } catch (error: any) {
    return sendResponse({ type: 'Fail', message: error.message })
  }
}

export { setApiKey, chatReply }
