type TimerId = ReturnType<typeof globalThis.setInterval>

export type Effects = {
  setInterval: (callback: () => void, ms: number) => TimerId
  clearInterval: (id: TimerId) => void
  randomInt: (max: number) => number
}

export const defaultEffects: Effects = {
  setInterval: globalThis.setInterval.bind(globalThis),
  clearInterval: globalThis.clearInterval.bind(globalThis),
  randomInt: (max: number) => Math.floor(Math.random() * max),
}
