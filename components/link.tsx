import Link, { LinkProps } from 'next/link'
import type { ReactNode } from 'react'

export default function MyLink({
  children,
  ...props
}: {
  children?: ReactNode
} & LinkProps) {
  return <Link className='underline text-slate-600 hover:text-slate-800' {...props}>{children}</Link>
}
