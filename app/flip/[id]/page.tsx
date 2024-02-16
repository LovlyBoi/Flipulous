import { memo, useEffect } from 'react'
import { resolve } from 'node:url'
import { notFound } from 'next/navigation'
import FlipCardContainer from './FlipCardContainer'
import FlipEditor from './FlipEditor'
import type { Article } from '@/app/types'

type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// fetch 缓存时间
export const revalidate = 3600

async function getArticleData(id: string): Promise<Article> {
  const fetchUrl = resolve(
    process.env.FETCH_BASEURL as string,
    `/article/queryById?id=${id}`,
  )
  const articleData = await fetch(fetchUrl, {
    method: 'GET',
  })

  if (!articleData.ok) {
    if (articleData.status === 404) {
      // 没有这篇文章
      notFound()
    } else {
      // 出错
      throw new Error('Failed to fetch blog data')
    }
  }
  const article = await articleData.json()
  if (!article || !article.data) {
    notFound()
  } else if (article.code !== 200) {
    throw new Error('Failed to fetch blog data')
  }

  return handleCardData(article.data)
}

function handleCardData(item: any): Article {
  return {
    id: item.id,
    title: item.title,
    author: item.author,
    type: item.type,
    tag: { name: item.tag_name, color: item.tag_color },
    publishDate: item.create_time,
    updateDate: item.create_time,
    pictures: item.pics.split(' '),
    content: item.content,
  }
}

export default memo(async function Article({
  params: { id },
  searchParams,
}: Props) {
  const articleData = await getArticleData(id)

  return (
    <div>
      <main className="absolute pt-4 mr-[380px] top-[68px] md:top-[60px] bottom-0 left-0 right-0 overflow-y-auto">
        <FlipEditor article={articleData} />
      </main>
      <aside className="absolute w-[380px] py-4 top-[68px] md:top-[60px] bottom-0 right-0 overflow-y-auto">
        <FlipCardContainer />
      </aside>
    </div>
  )
})
