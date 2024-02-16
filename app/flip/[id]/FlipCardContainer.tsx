'use client'
import { useEffect, type FC, type ReactNode, useState } from 'react'
import Modal from 'react-modal'
import { useRouter, usePathname } from 'next/navigation'

import { CloseOutline, InformationCircleOutline } from '@ricons/ionicons5'
import FlipCard from './FlipCard'
import { useHighlightItemStore } from './highlightStore'

type Props = {
  children?: ReactNode
}

const FlipCardContainer: FC<Props> = () => {
  const router = useRouter()
  const pathname = usePathname()

  const highlightItems = useHighlightItemStore((store) => store.highlightItems)
  const cacheHighlightItems = useHighlightItemStore(
    (store) => store.cacheHighlightItems,
  )
  const setHighlightItems = useHighlightItemStore(
    (store) => store.setHighlightItems,
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setHighlightItems([], undefined, undefined, false)
  }, [setHighlightItems])

  useEffect(() => {
    Modal.setAppElement(document.body)
  }, [])

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function handleToLoginPage() {
    cacheHighlightItems()
    localStorage.setItem('originPath', pathname)
    router.push('/login')
  }

  const customStyles: Modal.Styles = {
    content: {
      width: '480px',
      height: '240px',
      margin: '50px auto',
      border: 'none',
      padding: '28px 40px',
    },
    overlay: {
      zIndex: 999,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
  }

  return (
    <div className="px-4 flex flex-col gap-4">
      {highlightItems.map((card, index) => {
        return (
          <FlipCard
            key={index}
            index={index + 1}
            card={card}
            openModal={openModal}
          />
        )
      })}
      <Modal isOpen={isModalOpen} style={customStyles}>
        <section className="flex flex-col justify-between h-full">
          <header className="flex justify-between">
            <h3 className="flex text-lg items-center">
              <InformationCircleOutline
                width={28}
                height={28}
                className="text-sky-400 mr-2 font-semibold -mb-[2px]"
              />
              <span>提示</span>
            </h3>
            <CloseOutline
              width={28}
              height={28}
              className=" text-slate-400 hover:text-slate-600 cursor-pointer"
              onClick={closeModal}
            />
          </header>
          <main className="flex-1 mt-4 mx-4">
            <p>此功能需要登录后使用。</p>
          </main>
          <footer className="flex justify-end mt-6">
            <button
              className="border px-4 rounded hover:bg-slate-50 text-slate-600"
              onClick={handleToLoginPage}
            >
              去登录
            </button>
          </footer>
        </section>
      </Modal>
    </div>
  )
}

export default FlipCardContainer
