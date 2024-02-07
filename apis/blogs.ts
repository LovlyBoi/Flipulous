import { Card, Blog } from '@/app/types'
import { request } from '@/utils/request'

export function getBlogs(type: string, ps = 10, pn = 1) {
  return request<{ cards: Card[]; hasNext: boolean }>({
    method: 'GET',
    url: '/blogs',
    params: {
      type,
      ps,
      pn,
    },
  })
}

export function getBlogsByType(type: string) {
  return request<{ cards: Card[]; hasNext: boolean }>({
    method: 'GET',
    url: '/blogs',
    params: {
      type,
    },
  })
}

export function getBlogById(id: string, visitorId?: string) {
  return request<Blog>({
    method: 'POST',
    url: `/blogs/article/${id}`,
    params: {
      visitorId,
    },
  })
}
