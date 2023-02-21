export function handleText(text: string): string {
  return text.replace(/\n/g, '<br />')
}
