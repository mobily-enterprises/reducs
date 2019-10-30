const state = {}
let beforeCallbacks = []
let afterCallbacks = []
let globalId = 10

const deleteId = (id, type) => {
  type === 'a'
    ? afterCallbacks = afterCallbacks.filter(e => e.id !== id)
    : beforeCallbacks = beforeCallbacks.filter(e => e.id !== id)
}

export const register = (fn, type = 'a') => {
  const id = globalId++
  (type === 'a' ? afterCallbacks : beforeCallbacks).push({ fn, id })
  return () => deleteId(id, type)
}

export const setState = async (key, value) => {
  for (const e of [...beforeCallbacks, { fn: () => { state[key] = value } }, ...afterCallbacks]) {
    const v = e.fn(key, value)
    if (v instanceof Promise) await v
  }
}

export const stateEmpty = () => !Object.keys(state).length
export const getState = (key) => state[key]

