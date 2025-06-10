export function getSymbolObject(desc: string | number): object {
  const sym = Symbol(desc)
  return Object(sym)
}

export function isSymbolObject(obj: object): boolean {
  return Object.prototype.toString.call(obj) === "[object Symbol]"
}
