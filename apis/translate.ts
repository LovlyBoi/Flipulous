import axios from 'axios'

interface WordTranslation {
  word: string
  accent: string
  mean_cn: string
  mean_en: string
  sentence: string
  sentence_trans: string
  sentence_phrase: string
  word_etyma: string
  cloze_data: {
    syllable: string
    cloze: string
    options: string[]
    tips: string[][]
  }
}

export async function translateWord(word: string) {
  word = word.trim().toLowerCase()

  let res: WordTranslation | null = null

  try {
    const { data } = await axios<WordTranslation>({
      method: 'GET',
      url: `https://cdn.jsdelivr.net/gh/lyc8503/baicizhan-word-meaning-API/data/words/${word}.json`,
    })
    res = data
  } catch (e) {}

  return res
}
