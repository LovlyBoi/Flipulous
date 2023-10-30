import Layout from '@/components/layout'
import MyLink from '@/components/link'
import { useRouter } from 'next/router'
import { getPostsName, getPostContent } from '@/lib/posts'

export default function Post({ content }: any) {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout>
      <div className="text-center text-xl font-bold">{id}</div>
      <MyLink href="/post">返回目录</MyLink>
      <pre className='w-full overflow-auto'>{content}</pre>
    </Layout>
  )
}

export async function getStaticPaths() {
  const fileNames = await getPostsName()
  const paths = fileNames.map((id) => ({
    params: {
      id,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { id } }: any) {
  const content = (await getPostContent(id)).toString()
  return {
    props: {
      id,
      content,
    },
  }
}
