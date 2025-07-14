import type { PartOfSpeechKeys } from "./mod/classify"

interface Relative {
  /* 词根 */
  root?: string
  /* 复数 */
  plural?: string
  /* 单数 */
  singular?: string
  /* 第三人称单数 - third person singular */
  tps?: string
  /* 第三人称复数 - third person plural */
  tpp?: string
  /* 过去式 - Past tense */
  past?: string
  /* 过去分词 - Past participle */
  pastParticiple?: string
  /* 现在式 - Present tense */
  present?: string
  /* 现在分词 - Present participle */
  presentParticiple?: string
  /* 将来式 - Future tense */
  future?: string
  /* 近义词 - synonym */
  synonym?: string
  /* 反义词 - antonym */
  antonym?: string
}

type Translate = {
  [key in PartOfSpeechKeys]?: string[]
}

export interface Vocabulary {
  /* 释义 */
  interpret: string
  /* 音标 (英) */
  pronunciation: string
  /* 拆解记忆 */
  memory: string[]
  /* 例句 */
  example: string
  /* 翻译 */
  translate: Translate
  /* 词义 */
  relative: Relative
  /* 相似词汇 - Similar words */
  similar: string[]
  /* 易混淆词汇 - Confusing words */
  confuse: string[]
}
