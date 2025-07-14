// arch = archaic = 过时词
import type { Vocabulary } from "./type"
import interpret from "./word/interpret"
import vocabulary from "./word/vocabulary"

const ZH_CN: Record<string, Vocabulary> = {
  vocabulary: vocabulary,
  interpret: interpret
}

const EN_US: Record<string, Vocabulary> = {}

export default {
  ZH_CN,
  EN_US
}
