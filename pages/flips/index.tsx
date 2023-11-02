import { useState, useEffect, useRef, FC } from 'react'

type CardProps = {
  children?: React.ReactNode
  card: Cards
}

// 右侧小卡片组件
const FlipCard: FC<CardProps> = ({ card }) => (
  <div className=' bg-yellow-50 mb-2 rounded-md'>
    <div className=' break-all'>{card.title}</div>
    <div className=' break-all'>{card.content}</div>
    <div className=' break-all'>{card.context}</div>
    <div className=' break-all'>{card.synonyms}</div>
  </div>
)

// Card 类型
type Cards = {
  title: string
  index: number
  content: string
  context: string
  synonyms: string
}

export default function FlipPage() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    resizeTextarea()
  }, [])

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    // 如果没有值，提前返回
    if (!textarea) return
    // 每次输入内容时，重新计算输入框高度
    textarea.style.height = '600px'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const someArtcle = `Historically, developers had to use different languages (e.g. JavaScript, PHP) and frameworks when writing code for the server and the client. With React, developers can use the same language (JavaScript), and the same framework (e.g. Next.js or your framework of choice). This flexibility allows you to seamlessly write code for both environments without context switching.

  However, each environment has its own set of capabilities and constraints. Therefore, the code you write for the server and the client is not always the same. There are certain operations (e.g. data fetching or managing user state) that are better suited for one environment over the other.
  
  Understanding these differences is key to effectively using React and Next.js. We'll cover the differences and use cases in more detail on the Server and Client Components pages, for now, let's continue building on our foundation.
  
  Request-Response Lifecycle
  Broadly speaking, all websites follow the same Request-Response Lifecycle:
  
  User Action: The user interacts with a web application. This could be clicking a link, submitting a form, or typing a URL directly into the browser's address bar.
  HTTP Request: The client sends an HTTP request to the server that contains necessary information about what resources are being requested, what method is being used (e.g. GET, POST), and additional data if necessary.
  Server: The server processes the request and responds with the appropriate resources. This process may take a couple of steps like routing, fetching data, etc.
  HTTP Response: After processing the request, the server sends an HTTP response back to the client. This response contains a status code (which tells the client whether the request was successful or not) and requested resources (e.g. HTML, CSS, JavaScript, static assets, etc).
  Client: The client parses the resources to render the user interface.
  User Action: Once the user interface is rendered, the user can interact with it, and the whole process starts again.
  A major part of building a hybrid web application is deciding how to split the work in the lifecycle, and where to place the Network Boundary.
  
  Network Boundary
  In web development, the Network Boundary is a conceptual line that separates the different environments. For example, the client and the server, or the server and the data store.
  
  In React, you choose where to place the client-server network boundary wherever it makes the most sense.
  
  Behind the scenes, the work is split into two parts: the client module graph and the server module graph. The server module graph contains all the components that are rendered on the server, and the client module graph contains all components that are rendered on the client.
  
  It may be helpful to think about module graphs as a visual representation of how files in your application depend on each other.
  
  You can use the React "use client" convention to define the boundary. There's also a "use server" convention, which tells React to do some computational work on the server while on the client.
  
  `

  const cards: Cards[] = [
    {
      title: 'hello world',
      index: 1,
      content: 'contentcontentcontentcontentcontentcontentcontent',
      context: 'context context context context context context context ',
      synonyms: 'asdasd asdasd asdasd',
    },
    {
      title: 'hello world',
      index: 2,
      content: 'contentcontentcontentcontentcontentcontentcontent',
      context: 'context context context context context context context ',
      synonyms: 'asdasd asdasd asdasd',
    },
    {
      title: 'hello world',
      index: 3,
      content: 'contentcontentcontentcontentcontentcontentcontent',
      context: 'context context context context context context context ',
      synonyms: 'asdasd asdasd asdasd',
    },
  ]

  return (
    <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 bg-zinc-100 px-8 font-serif">
      <div className="text-center text-xl tracking-wider">Flipulous</div>
      <div className="flex justify-between">
        <div
          className="w-1/2 flex-1 overflow-y-auto bg-white mr-4 rounded-md text-lg"
          style={{ minHeight: '600px', maxHeight: 'calc(100vh - 80px)' }}
        >
          <textarea
            ref={textareaRef}
            className="w-full focus:outline-none p-4 tracking-wide min-h-[600px] resize-none overflow-hidden bg-transparent"
            onInput={() => resizeTextarea()}
            defaultValue={someArtcle}
            style={{ color: 'rgba(0, 0, 0, 0)' }}
          ></textarea>
        </div>
        <div className="w-[200px] bg-white">{
          cards.map((c) => (<FlipCard card={c} key={c.index}></FlipCard>))
        }</div>
      </div>
    </div>
  )
}
