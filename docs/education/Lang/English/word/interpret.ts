import type { Vocabulary } from "../type"

const interpret: Vocabulary = {
  interpret: "解释或理解某些事情的含义",
  pronunciation: `ɪn'tɜːprɪt`,
  example:
    "The professor will interpret the meaning of the text for the students.",
  memory: ["inter", "pret"],
  translate: {
    v: ["解释", "口译", "演绎", "翻译"]
  },
  relative: {
    plural: "interprets",
    singular: "interpret",
    tps: "interprets",
    tpp: "interpret",
    past: "interpreted",
    pastParticiple: "interpreted",
    presentParticiple: "interpreting",
    synonym: "explain",
    antonym: "misinterpret"
  },
  similar: ["explain", "translate", "clarify", "decipher"],
  confuse: ["translate", "explain"]
}

export default interpret
