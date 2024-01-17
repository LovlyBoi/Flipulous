import { memo } from 'react'
import { resolve } from 'node:url'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// 生成动态 meta
// export async function generateMetadata({ params }: Props) {
//   const blog = await getBlogData(params.id)
//   const title = getHighestTitle(blog.parsed.outline)
//   return {
//     title,
//   }
// }

// fetch 缓存时间
export const revalidate = 3600

// // 获取博客内容
// async function getBlogData(id: string, visitorId?: string): Promise<Blog> {
//   const fetchUrl = resolve(
//     process.env.FETCH_BASEURL as string,
//     `/blogs/article/${id}`,
//   )
//   const blogData = await fetch(fetchUrl, {
//     method: 'POST',
//     body: JSON.stringify({ visitorId }),
//   })
//   if (!blogData.ok) {
//     if (blogData.status === 404) {
//       // 没有这篇文章
//       notFound()
//     } else {
//       // 出错
//       throw new Error('Failed to fetch blog data')
//     }
//   }
//   return blogData.json()
// }

export default memo(async function Article({
  params: { id },
  searchParams,
}: Props) {
  // const blog = await getBlogData(id)

  return (
    <>
      flip: {id}
    </>
  )
})
