import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const mdi = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + mdi.utils.escapeHtml(str) + '</code></pre>'
    )
  },
})

const md2html = (str: string) => {
  return mdi.render(str)
}

export default md2html
