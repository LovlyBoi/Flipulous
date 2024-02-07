import { memo } from 'react'
import FlipCardContainer from './FlipCardContainer'
import CMEditor from './CMEditor'

type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// fetch 缓存时间
// export const revalidate = 3600

export default memo(async function Article({
  params: { id },
  searchParams,
}: Props) {
  return (
    <div className=''>
      <main className="absolute pt-4 mr-[380px] top-[68px] md:top-[60px] bottom-0 left-0 right-0 overflow-y-auto">
        {/* <FlipArea /> */}
        <CMEditor />
      </main>
      <aside className='absolute w-[380px] pt-4 top-[68px] md:top-[60px] bottom-0 right-0 overflow-y-auto'>
        <FlipCardContainer />
      </aside>
    </div>
  )
})
