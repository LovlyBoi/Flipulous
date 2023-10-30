import { memo } from 'react'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import Layout from '@/components/layout'
import MyLink from '@/components/link'

type ButtonProps = {
  children?: ReactNode
} & ButtonHTMLAttributes<any>

const MyButton = memo<ButtonProps>(function MyButton(props) {
  const newProps = {
    ...props,
  }
  delete newProps.className
  return (
    <button
      className={
        'border px-2 bg-red-100 hover:bg-red-200 rounded-md ' +
        (props.className ?? '')
      }
      {...newProps}
    >
      {props.children}
    </button>
  )
})

export default memo(function About() {
  const todoList = [
    {
      id: 1,
      content: '吃饭',
    },
    {
      id: 2,
      content: '睡觉',
    },
    {
      id: 3,
      content: '打豆豆',
    },
    {
      id: 4,
      content: '买橘子',
    },
  ]

  return (
    <Layout>
      <div className="about-title">About Page</div>
      <MyLink href="/post">To Post Page</MyLink>
      <hr />
      <MyButton className="ml-3 bg-blue-100 hover:bg-blue-200">按钮</MyButton>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </Layout>
  )
})
