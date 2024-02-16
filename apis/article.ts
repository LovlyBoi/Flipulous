import { request } from '@/utils/request'
import { type TranslatedItem } from '@/app/flip/[id]/highlightStore'

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

// 查所有文章
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

// 查文章内容
export function getArticleContent(id: string | number) {
  return request<ResponseData<Article>>({
    method: 'GET',
    url: '/article/page',
    params: {
      id,
    },
  })
}

// 查所有有收藏的文章
export function getFavorites(pn: number, ps: number) {
  return request<
    ResponseData<{
      list: Article[]
      hasNext: boolean
    }>
  >({
    method: 'GET',
    url: '/articleUserRelation/queryFavorites',
    params: {
      pageNumber: pn,
      pageSize: ps,
    },
  })
}

// 查看该文章所有收藏
export function queryFavorites(articleId: string | number) {
  return request<{
    code: number
    msg: string
    list: any[]
  }>({
    method: 'GET',
    url: '/translationRecord/getAllByArticleId',
    params: {
      articleId,
    },
  })
}

// 添加收藏
export function addFavoritesTranslation(
  articleId: string | number,
  translation: TranslatedItem,
) {
  return request<ResponseData>({
    method: 'POST',
    url: '/translationRecord/save',
    data: {
      articleId,
      originStatement: 'unuse',
      result: 'unuse',
      translation,
    },
  })
}

// 删除收藏
export function removeFavoritesTranslation(
  articleId: string | number,
  from: number,
  to: number,
) {
  return request<ResponseData>({
    method: 'POST',
    url: '/translationRecord/unStarById',
    data: {
      articleId,
      from,
      to,
    },
  })
}
