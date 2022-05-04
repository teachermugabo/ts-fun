interface test {
  in: string,
  out: string,
  desc: string
}

let tests: test[] = [
  // simplify expressions
  { in: `0+2x`, out: `2x`, desc: 'removes 0 terms in addition' },
  { in: `0-x`, out: `-x`, desc: 'removes 0 terms in subtraction' },
  { in: `1x+2x`, out: `x+2x`, desc: 'removes coefficients of 1' },
  {
    in: `1*1*x`,
    out: `x`,
    desc: 'removes multiple multiplications by 1'
  },
  { in: `5/1x`, out: `5x`, desc: 'reduces division by 1' },

  // simplify equations
  { in: `y=0x^2+2x`, out: `y=2x`, desc: 'removes zeroed terms' },
  {
    in: `y=0x^2+0x+0`,
    out: `y=0`,
    desc: 'simplify if one side of an equation reduces to zero'
  },
  {
    in: `y-0x=x^2+0`,
    out: `y=x^2`,
    desc: 'simplify boths sides of the equation'
  },

  // grouping
  {
    in: `y=2(x_{foo}-0)^2+0`,
    out: `y=2x_{foo}^2`,
    desc: 'collapse unnecessary grouping with identifier with subscript'
  },
  {
    in: `y=((x-1)!-(x-0)!)^k`,
    out: `y=((x-1)!-x!)^k`,
    desc:
      'collapse unnecessary grouping, maintain necessary ones with unary operators.'
  },
  {
    in: `y=(-2.5)^k`,
    out: `y=(-2.5)^k`,
    desc: 'Keep grouping with negative number'
  },
  {
    in: `y=(+2.5)^k`,
    out: `y=2.5^k`,
    desc: 'collapse unnecessary grouping with a positive number'
  },

  // simplify signs
  { in: `x+-C`, out: `x-C`, desc: 'replaces +- with -' },
  { in: `+x`, out: `x`, desc: 'removes leading + sign coefficient' },
  {
    in: `+-+x`,
    out: `-x`,
    desc: 'reduces consecutive plusses and minuses'
  },
  {
    in: `--x`,
    out: `x`,
    desc: 'reduces -- to + and removes leading + sign'
  },
  {
    in: `---x`,
    out: `-x`,
    desc: 'reduces arbitrary nested negative numbers'
  },
  {
    in: `-(-x)`,
    out: `x`,
    desc:
      'replaces negatives multiplication with implicit multiplication by 1'
  },
  {
    in: `5-(-x)`,
    out: `5+x`,
    desc: 'replaces subtraction of negative in parens with addition'
  },
  {
    in: `5+(-x)`,
    out: `5-x`,
    desc: 'replaces addition of negative in parens with subtraction'
  },

  // do nothing tests
  {
    in: `(5/5)x`,
    out: `(5/5)x`,
    desc: "doesn't simplify fractional coeffs"
  },
  {
    in: `0x^2+0x`,
    out: `0x^2+0x`,
    desc: 'do nothing if expression reduces to nothing'
  }
];


type testMap = string;
type testAction = string;
interface newTest {
  map: testMap,
  desc: testAction,
}

const fun = (tests: test[]): newTest[] => {
  let newTests: newTest[] = [];

  tests.map(test => newTests.push(
    {
      "map": `${test.in} -> ${test.out}`,
      "desc": test.desc
    }
  ))

  return newTests;
}

console.log(fun(tests))

const newTests2: newTest[] = [
  { map: '0+2x -> 2x', desc: 'removes 0 terms in addition' },
  { map: '0-x -> -x', desc: 'removes 0 terms in subtraction' },
  { map: '1x+2x -> x+2x', desc: 'removes coefficients of 1' },
  {
    map: '1*1*x -> x',
    desc: 'removes multiple multiplications by 1'
  },
  { map: '5/1x -> 5x', desc: 'reduces division by 1' },
  { map: 'y=0x^2+2x -> y=2x', desc: 'removes zeroed terms' },
  {
    map: 'y=0x^2+0x+0 -> y=0',
    desc: 'simplify if one side of an equation reduces to zero'
  },
  {
    map: 'y-0x=x^2+0 -> y=x^2',
    desc: 'simplify boths sides of the equation'
  },
  {
    map: 'y=2(x_{foo}-0)^2+0 -> y=2x_{foo}^2',
    desc: 'collapse unnecessary grouping with identifier with subscript'
  },
  {
    map: 'y=((x-1)!-(x-0)!)^k -> y=((x-1)!-x!)^k',
    desc: 'collapse unnecessary grouping, maintain necessary ones with unary operators.'
  },
  {
    map: 'y=(-2.5)^k -> y=(-2.5)^k',
    desc: 'Keep grouping with negative number'
  },
  {
    map: 'y=(+2.5)^k -> y=2.5^k',
    desc: 'collapse unnecessary grouping with a positive number'
  },
  { map: 'x+-C -> x-C', desc: 'replaces +- with -' },
  { map: '+x -> x', desc: 'removes leading + sign coefficient' },
  {
    map: '+-+x -> -x',
    desc: 'reduces consecutive plusses and minuses'
  },
  {
    map: '--x -> x',
    desc: 'reduces -- to + and removes leading + sign'
  },
  {
    map: '---x -> -x',
    desc: 'reduces arbitrary nested negative numbers'
  },
  {
    map: '-(-x) -> x',
    desc: 'replaces negatives multiplication with implicit multiplication by 1'
  },
  {
    map: '5-(-x) -> 5+x',
    desc: 'replaces subtraction of negative in parens with addition'
  },
  {
    map: '5+(-x) -> 5-x',
    desc: 'replaces addition of negative in parens with subtraction'
  },
  {
    map: '(5/5)x -> (5/5)x',
    desc: "doesn't simplify fractional coeffs"
  },
  {
    map: '0x^2+0x -> 0x^2+0x',
    desc: 'do nothing if expression reduces to nothing'
  }
]

const newTests1: [testMap, testAction][] = [
  // expressions
  ['0+2x -> 2x', 'removes 0 terms in addition'],
  ['0-2x -> 42', 'hello there'],
  ['0-x -> -x', 'removes 0 terms in subtraction'],
  ['1x+2x -> x+2x', 'removes coefficients of 1'],
  ['1*1*x -> x', 'removes multiple multiplications by 1'],
  ['5/1x -> 5x', 'reduces division by 1'],

  // equations
  ['y=0x^2+2x -> y=2x', 'removes zeroed terms'],
  [
    'y=0x^2+0x+0 -> y=0',
    'simplify if one side of an equation reduces to zero'
  ],
  ['y-0x=x^2+0 -> y=x^2', 'simplify boths sides of the equation'],

  // collapse grouping
  [
    'y=2(x_{foo}-0)^2+0 -> y=2x_{foo}^2',
    'collapse unnecessary grouping with identifier with subscript'
  ],
  [
    'y=((x-1)!-(x-0)!)^k -> y=((x-1)!-x!)^k',
    'collapse unnecessary grouping, maintain necessary ones with unary operators.'
  ],
  ['y=(-2.5)^k -> y=(-2.5)^k', 'Keep grouping with negative number'],
  [
    'y=(+2.5)^k -> y=2.5^k',
    'collapse unnecessary grouping with a positive number'
  ],

  // simplify signs
  ['x+-C -> x-C', 'replaces +- with -'],
  ['+x -> x', 'removes leading + sign coefficient'],
  ['+-+x -> -x', 'reduces consecutive plusses and minuses'],
  ['--x -> x', 'reduces -- to + and removes leading + sign'],
  ['---x -> -x', 'reduces arbitrary nested negative numbers'],
  [
    '-(-x) -> x',
    'replaces negatives multiplication with implicit multiplication by 1'
  ],
  [
    '5-(-x) -> 5+x',
    'replaces subtraction of negative in parens with addition'
  ],
  [
    '5+(-x) -> 5-x',
    'replaces addition of negative in parens with subtraction'
  ],

  // don't change
  ['(5/5)x -> (5/5)x', "doesn't simplify fractional coeffs"],
  [
    '0x^2+0x -> 0x^2+0x',
    'do nothing if expression reduces to nothing'
  ]
]