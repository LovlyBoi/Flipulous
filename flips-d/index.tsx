import { useEffect, useRef, useState, type FC } from 'react'
import FlipCard, { type Cards } from '@/components-d/flips/card'
import Image from 'next/image'
import MyLink from '@/components-d/link'
import './index.css'

const FlipPage: FC = () => {
  // useEffect(() => {
  //   resizeTextarea()
  // }, [])

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    // 如果没有值，提前返回
    if (!textarea) return
    // 每次输入内容时，重新计算输入框高度
    textarea.style.height = '400px'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const someArtcle = `Historically, developers had 
  
  to use different languages (e.g. JavaScript, PHP) and frameworks when writing code for the server and the client. With React, developers can use the same language (JavaScript), and the same framework (e.g. Next.js or your framework of choice). This flexibility allows you to seamlessly write code for both environments without context switching.

  However, each environment has its own set of capabilities and constraints. Therefore, the code you write for the server and the client is not always the same. There are certain operations (e.g. data fetching or managing user state) that are better suited for one environment over the other.
  
  Understanding these differences is key to effectively using React and Next.js. We'll cover the differences and use cases in more detail on the Server and Client Components pages, for now, let's continue building on our foundation.
  
  Request-Response Lifecycle
  Broadly speaking, all websites follow the same Request-Response Lifecycle:
  `

  const [article, setArticle] = useState(someArtcle)

  const cards: Cards[] = [
    {
      title: 'hello world',
      index: 1,
      content: 'contentcontentcontentcontentcontentcontentcontent',
      context:
        'context context context context context context context ',
      synonyms: 'asdasd asdasd asdasd',
    },
    {
      title: 'hello world',
      index: 2,
      content: 'contentcontentcontentcontentcontentcontentcontent',
      context:
        'context context context context context context context ',
      synonyms: '',
    },
    {
      title: 'hello world',
      index: 3,
      content: 'contentcontentcontentcontentcontentcontentcontent',
      context:
        'context context context context context context context ',
      synonyms: Array(20).fill('hello').join(''),
    },
  ]

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 px-8 bg-zinc-100 font-serif overflow-auto">
      <div className="w-[1256px] mx-auto">
        <div className="flex justify-between">
          <div className="flex text-xl tracking-wider">
            <div className="flex gap-2 items-center">
              <div className="group ">
                <Image
                  src="/image/wode.png"
                  width={25}
                  height={15}
                  alt="mine"
                />
                <ul className="up-arrow group-hover:block hidden border absolute -ml-3 mt-1 bg-white w-[150px] py-4 rounded-md">
                  {[
                    { title: '生词本', to: '' },
                    { title: '收藏句子', to: '' },
                    { title: '收藏文章', to: '' },
                  ].map((item) => (
                    <li key={item.title} className=" text-center">
                      <MyLink href={item.to}>{item.title}</MyLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <MyLink href="/">首页</MyLink>
              </div>
            </div>
          </div>
          <div className="flex text-2xl tracking-wider">
            Flipulous
          </div>
          <div className="flex gap-2 text-2xl tracking-wider">
            <MyLink href="">登录</MyLink>
            <MyLink href="">注册</MyLink>
          </div>
        </div>
        <div className="flex">
          <div
            className="w-[940px] overflow-y-auto bg-white mr-4 rounded-md text-lg"
            style={{
              minHeight: '400px',
              maxHeight: 'calc(100vh - 80px)',
            }}
          >
            <div className="w-[940px] relative focus:outline-none p-4 tracking-wide min-h-[400px] whitespace-pre-wrap">
              <textarea
                ref={textareaRef}
                className="w-[940px] bg-transparent p-4 absolute top-0 bottom-0 left-0 right-0 focus:outline-none tracking-wide resize-none overflow-hidden caret-black"
                onInput={(e) => {
                  setArticle((e.target as HTMLTextAreaElement).value)
                }}
                defaultValue={article}
                style={{ color: 'rgba(0, 0, 0, 0)' }}
                // style={{ color: 'red' }}
              ></textarea>
              {article.split('\n').map((p, index) => {
                return (
                  <p key={index} className=" min-h-[1.75rem]">
                    {p}
                  </p>
                )
              })}
            </div>
          </div>
          <div className="w-[300px] bg-zinc-100">
            {cards.map((c) => (
              <FlipCard card={c} key={c.index}></FlipCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipPage
