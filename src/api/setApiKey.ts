import service from './axios'

// TODO...
export default async function setApiKey(apiKey: string): Promise<Response> {
  return service.post('/setApiKey', { apiKey })
}
