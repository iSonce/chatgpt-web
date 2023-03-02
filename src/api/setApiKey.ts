import service from './axios'

// TODO...
export default async function setApiKey(apiKey: string): Promise<string> {
  return service.post('/setApiKey', { apiKey }).then((res) => {
    return res.data
  })
}
