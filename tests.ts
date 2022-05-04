// item #
interface Outer {
  inner: {
    x: number
  }
}

const o: Readonly<Outer> = { inner: { x: 0 } }
// o.inner = { x: 1 }
o.inner.x = 1 // OK

type T = Readonly<Outer>;

let obj: { readonly [k: string]: number } = {}
console.log(obj)
// obj.hi = 45 // so can't mutable
// obj.hi
obj = { ...obj, hi: 12 }
obj = { ...obj, hi: 13 }
obj = { ...obj, bye: 45 }
console.log(obj)
