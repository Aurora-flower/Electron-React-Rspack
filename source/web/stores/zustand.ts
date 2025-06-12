import { create } from "zustand"

export const useBearStore = create(set => ({
  bears: 0,
  increasePopulation: (): void =>
    set((state: AnyModel) => ({ bears: state.bears + 1 })),
  removeAllBears: (): void => set({ bears: 0 })
}))

// 使用示例
// function BearCounter() {
//   const bears = useBearStore((state) => state.bears)
//   return <h1>{bears} around here ...</h1>
// }

// function Controls() {
//   const increasePopulation = useBearStore((state) => state.increasePopulation)
//   return <button onClick={increasePopulation}>one up</button>
// }
