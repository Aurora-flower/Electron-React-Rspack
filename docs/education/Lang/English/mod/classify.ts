// word class
// describe = description
// abcdefjhijklmnopqrstuvwxyz

interface PartOfSpeech {
  /* full word */
  full: string;
  /* 表示 */
  satisfies: string;
  /* 描述 */
  describe: string;
}

export const partOfSpeech: Record<string, PartOfSpeech> = {
  adj: {
    full: "adjective",
    satisfies: "形容词",
    describe: "表示人或事物的特征，通常用于修饰名词",
  },
  adv: {
    full: "adverb",
    satisfies: "副词",
    describe: "修饰动词、形容词或其他副词，表示时间、地点、方式等",
  },
  art: {
    full: "article",
    satisfies: "冠词",
    describe: "用于限定名词的指示作用，通常分为定冠词和不定冠词",
  },
  conj: {
    full: "conjunction",
    satisfies: "连词",
    describe: "用于连接词、短语或句子，表示句子之间的关系",
  },
  interj: {
    full: "interjection",
    satisfies: "感叹词",
    describe: "表达强烈情感或反应的词，通常是独立的",
  },
  num: {
    full: "numeral",
    satisfies: "数词",
    describe: "表示数量、顺序等的词，分为基数词和序数词",
  },
  n: {
    full: "noun",
    satisfies: "名词",
    describe: "表示人、事物、地点、思想、情感等的词",
  },
  prep: {
    full: "preposition",
    satisfies: "介词",
    describe: "用于连接名词或代词与句子中的其他部分，表示位置、时间、方向等",
  },
  pron: {
    full: "pronoun",
    satisfies: "代词",
    describe: "用于代替名词或名词短语的词",
  },
  v: {
    full: "verb",
    satisfies: "动词",
    describe: "表示动作、状态、发生等的词",
  },
  // Special
  vt: {
    full: "verb",
    satisfies: "及物动词",
    describe: "需要直接宾语的动词",
  },
  vi: {
    full: "verb",
    satisfies: "不及物动词",
    describe: "不需要直接宾语的动词",
  },
};

export type PartOfSpeechKeys = keyof typeof partOfSpeech;
