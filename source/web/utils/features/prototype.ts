export function getSuper(ctor: AnyModel): AnyModel {
  const proto = ctor.prototype
  const dunderProto = proto && Object.getPrototypeOf(proto)
  console.log(dunderProto)
  return dunderProto?.constructor
}
