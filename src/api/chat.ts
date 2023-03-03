import service from './axios'
import type { AxiosResponse } from 'axios'

export default async function chat(
  text: string,
  options: ChatContext
): Promise<AxiosResponse> {
  // console.log(text, options)
  return service.post('/chat', { text, options })
}
