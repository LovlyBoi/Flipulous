import { request } from '@/utils/request'

interface ResponseData<T = unknown> {
  code: number
  msg: string
  data: T
}

export interface Article {
  id: number
  create_time: string
  title: string
  source: string
  author: string
  content: string
  tag_name: string
  tag_color: string
  pics: string
  type: string
}

export function getArticle(pn: number, ps: number) {
  return request<
    ResponseData<{
      list: Article[]
      hasNext: boolean
    }>
  >({
    method: 'GET',
    url: '/article/page',
    params: {
      pageNumber: pn,
      pageSize: ps,
    },
  })
}

export function getArticleContent(id: string | number) {
  return request<ResponseData<Article>>({
    method: 'GET',
    url: '/article/page',
    params: {
      id,
    },
  })
}
