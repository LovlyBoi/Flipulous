import Layout from '@/components/layout'
import MyLink from '@/components/link'
import { getPostsName } from '@/lib/posts'

export default function Post({ fileNames }: { fileNames: string[] }) {
  return (
    <Layout>
      <div className="text-center text-xl font-bold">Post Page</div>
      <ul>
        {fileNames.map((file) => (
          <li key={file}>
            <MyLink href={`/post/${file}`}>{file}</MyLink>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const fileNames = await getPostsName()

  return {
    props: {
      fileNames,
    },
  }
}
