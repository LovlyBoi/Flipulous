'use client'
import { type ReactNode, memo, useEffect } from 'react'
import CardContainer from '@/app/(classes)/CardContainer'
import { useUserStore } from '@/app/(users)/userStore'

export default memo(function Favorites() {
  return <CardContainer type="favorites" />
})
