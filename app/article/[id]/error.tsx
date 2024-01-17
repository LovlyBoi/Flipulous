'use client' // Error components must be Client Components
import { useEffect } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      className={`${inter.className} w-screen h-screen flex justify-center items-center`}
    >
      <div className="h-[50px] flex items-center">
        <h1 className="h-full leading-[50px] text-[24px] pr-[24px] font-medium border-r border-gray-400">
          500
        </h1>
        <div className="h-full leading-[50px] pl-[24px]">
          好像哪里出错了{' '}
          <Link
            href="/"
            className=" text-xs text-gray-500 underline hover:text-gray-600"
          >
            回去看看
          </Link>
          。
        </div>
      </div>
    </div>
  )
}
