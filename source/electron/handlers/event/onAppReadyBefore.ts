import { privilegedSchemes } from "@main/helpers/modules/protocol"

async function onAppReadyBefore(): Promise<void> {
  privilegedSchemes()
}

export default onAppReadyBefore
