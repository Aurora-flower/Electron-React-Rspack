import { privilegedSchemes } from "@main/features/protocol"

async function onAppReadyBefore(): Promise<void> {
  privilegedSchemes()
}

export default onAppReadyBefore
