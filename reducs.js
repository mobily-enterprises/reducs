const state = {}
let beforeCallbacks = []
let afterCallbacks = []
let globalId = 0

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
/*
// debugger

setState('state', 1)
const f1 = () => console.log('f1')
const f2 = () => console.log('f2')
const f3 = () => console.log('f3')

const removeF11 = register(f1)
const removeF12 = register(f1)
const removeF2 = register(f2)
const removeF3 = register(f3, 'b')

setState('state', 2)
console.log('-------')

removeF2()

setState('state', 3)
console.log('-------')

removeF3()
setState('state', 4)
console.log('-------')
*/
