import { type FC, type ReactNode } from 'react'

type Props = {
  children?: ReactNode
  index: number
}

const card = {
  section: 'a cat',
  translate: '一只猫',
  context: 'There is a cat on the mat.',
  synonyms: 'a cat, a kitten, a feline, a feline, a feline',
}

const FlipCard: FC<Props> = ({ index }) => {
  return (
    <section className="bg-white rounded-md p-4 flex flex-col gap-2">
      <div>
        <sup className='inline-block mr-1'>{(index != null) && `[${index}]`}</sup>
        <h3 className="inline-block font-bold text-lg">{card.section}</h3>
      </div>
      <p>{card.translate}</p>
      <p>原文: {' ' + card.context}</p>
      <p className=" text-gray-400">近义词: {' ' + card.synonyms}</p>
    </section>
  )
}

export default FlipCard
