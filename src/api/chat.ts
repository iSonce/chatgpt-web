import service from './axios'

export default async function chat(
  text: string,
  options: ChatContext
): Promise<Message> {
  return service.post('/chat', { text, options }).then((res) => {
    return {
      text: res.data.data.text,
      id: res.data.data.id,
    }
  })
}
