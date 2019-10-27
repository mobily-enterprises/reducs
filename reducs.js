let state = null
const beforeSetStateCallbacks = []
const afterSetStateCallbacks = []

export const beforeSetState = (fn) => beforeSetStateCallbacks.push(fn)
export const afterSetState = (fn) => afterSetStateCallbacks.push(fn)

export const setState = async (key, value) => {
  if (state === null) state = {}
  for (const fn of beforeSetStateCallbacks) await fn(key, value)
  state[key] = value
  for (const fn of afterSetStateCallbacks) await fn(key, value)
}

export const stateEmpty = () => {
  return !state
}

export const getState = (key) => {
  if (!state) return null
  return state[key]
}
