export default [
  {
    text: '你好',
  },
  {
    text: '你好！',
    id: 'chatcmpl-6rrhpSY7Du3sub9QjZ9b7eArfrnTw',
  },
  {
    text: '能用ts写一个节流函数嘛',
  },
  {
    text: '可以的，以下是一个使用 TypeScript 编写的节流函数：\n\n```typescript\nfunction throttle<T extends (...args: any[]) => void>(\n  fn: T,\n  delay: number\n): T {\n  let timerId: NodeJS.Timeout | undefined;\n\n  return ((...args: Parameters<T>) => {\n    if (!timerId) {\n      timerId = setTimeout(() => {\n        fn(...args);\n        timerId = undefined;\n      }, delay);\n    }\n  }) as T;\n}\n```\n\n这个函数接受两个参数：要执行的函数和时间间隔（以毫秒为单位）。当调用返回的函数时，它会检查是否存在计时器。如果没有，则创建一个新的计时器，并在指定的延迟后执行传入的函数。如果计时器已经存在，则不做任何事情。\n\n这个函数使用了泛型和 TypeScript 的类型推断，因此可以安全地将其应用于各种不同类型的函数。',
    id: 'chatcmpl-6rrhzIbUJelvNGxDal3TMHMD9gULc',
  },
  {
    text: '该用js试试',
  },
  {
    text: '当然！以下是一个使用 JavaScript 编写的节流函数：\n\n```javascript\nfunction throttle(fn, delay) {\n  let timerId;\n\n  return function(...args) {\n    if (!timerId) {\n      timerId = setTimeout(() => {\n        fn(...args);\n        timerId = undefined;\n      }, delay);\n    }\n  };\n}\n```\n\n这个函数与 TypeScript 版本非常相似，并且使用了相同的逻辑。它接受两个参数：要执行的函数和时间间隔（以毫秒为单位）。当调用返回的函数时，它会检查是否存在计时器。如果没有，则创建一个新的计时器，并在指定的延迟后执行传入的函数。如果计时器已经存在，则不做任何事情。\n\n请注意，在 JavaScript 中，参数不像 TypeScript 中那样具有类型注释。因此，我们需要使用 rest 参数来捕获所有的参数，并将它们传递给原始函数。',
    id: 'chatcmpl-6rri9anU9PqXXljducHd9FETXsQf2',
  },
]
