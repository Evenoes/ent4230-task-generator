import { fixed, money, number, roundTo, task, type Template } from '../core'

export const topic2AnalysisTemplates: Template[] = [
  {
    id: 'vertical-analysis', priority: 'high', generate: (n) => {
      const sales = n.money(1_800_000, 9_000_000, 50_000)
      const expense = roundTo(sales * n.whole(12, 34) / 100, 5_000)
      const answer = fixed(expense / sales * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Vertical analysis', question: 'What percentage of net sales is used by operating expenses?',
        statementTitle: 'Income statement extract', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Net sales', value: sales, format: 'currency', emphasis: true },
          { label: 'Operating expenses', value: expense, format: 'currency' },
        ] }], answer,
        hints: ['Percentage of net sales = Income-statement item ÷ Net sales × 100'],
        solution: `${money(expense)} ÷ ${money(sales)} × 100 = ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'horizontal-analysis', priority: 'high', generate: (n) => {
      const oldAmount = n.money(700_000, 5_000_000, 25_000)
      const changeRate = n.whole(-18, 28)
      const newAmount = roundTo(oldAmount * (1 + changeRate / 100), 1_000)
      const answer = fixed((newAmount - oldAmount) / oldAmount * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Horizontal analysis', question: 'Calculate the percentage change from Year 1 to Year 2.',
        statementTitle: 'Two-year comparison', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Year 1 amount', value: oldAmount, format: 'currency' },
          { label: 'Year 2 amount', value: newAmount, format: 'currency' },
        ] }], answer,
        hints: ['Percentage change = (New amount − Old amount) ÷ Old amount × 100'],
        solution: `The change is ${money(newAmount - oldAmount)}. Divide it by the Year 1 amount to get ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'gross-margin', priority: 'high', generate: (n) => {
      const sales = n.money(1_500_000, 8_000_000, 25_000)
      const cogs = roundTo(sales * n.whole(38, 68) / 100, 5_000)
      const grossProfit = sales - cogs
      const answer = fixed(grossProfit / sales * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Profitability ratio', question: 'Calculate the gross profit margin.',
        statementTitle: 'Income statement extract', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Net sales', value: sales, format: 'currency' },
          { label: 'Cost of goods sold', value: cogs, format: 'currency' },
        ] }], answer,
        hints: ['Gross profit = Net sales − COGS', 'Gross profit margin = Gross profit ÷ Net sales × 100'],
        solution: `Gross profit is ${money(grossProfit)}, giving a gross margin of ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'operating-margin', priority: 'high', generate: (n) => {
      const sales = n.money(2_000_000, 9_500_000, 50_000)
      const cogs = roundTo(sales * n.whole(40, 58) / 100, 5_000)
      const expenses = roundTo(sales * n.whole(17, 29) / 100, 5_000)
      const ebit = sales - cogs - expenses
      const answer = fixed(ebit / sales * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Profitability ratio', question: 'Calculate the operating profit margin.',
        statementTitle: 'Income statement extract', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Net sales', value: sales, format: 'currency' },
          { label: 'Cost of goods sold', value: cogs, format: 'currency' },
          { label: 'Operating expenses', value: expenses, format: 'currency' },
        ] }], answer,
        hints: ['EBIT = Net sales − COGS − Operating expenses', 'Operating profit margin = EBIT ÷ Net sales × 100'],
        solution: `EBIT is ${money(ebit)}, so the operating margin is ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'net-margin', priority: 'high', generate: (n) => {
      const sales = n.money(2_000_000, 12_000_000, 50_000)
      const netIncome = roundTo(sales * n.whole(5, 19) / 100, 5_000)
      const answer = fixed(netIncome / sales * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Profitability ratio', question: 'Calculate the net profit margin.',
        statementTitle: 'Income statement extract', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Net sales', value: sales, format: 'currency' },
          { label: 'Net income', value: netIncome, format: 'currency', emphasis: true },
        ] }], answer,
        hints: ['Net profit margin = Net income ÷ Net sales × 100'],
        solution: `${money(netIncome)} ÷ ${money(sales)} × 100 = ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'return-on-assets', priority: 'high', generate: (n) => {
      const ebit = n.money(350_000, 2_100_000, 25_000)
      const beginAssets = n.money(3_000_000, 10_000_000, 50_000)
      const endAssets = beginAssets + n.money(250_000, 1_800_000, 25_000)
      const average = (beginAssets + endAssets) / 2
      const answer = fixed(ebit / average * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Return on assets', question: 'Calculate operating return on assets.',
        statementTitle: 'Income statement and balance sheet', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Income statement', rows: [{ label: 'Operating income (EBIT)', value: ebit, format: 'currency' }] },
          { title: 'Balance sheet', rows: [
            { label: 'Total assets — beginning', value: beginAssets, format: 'currency' },
            { label: 'Total assets — ending', value: endAssets, format: 'currency' },
          ] },
        ], answer,
        hints: ['Average total assets = (Beginning assets + Ending assets) ÷ 2', 'Operating ROA = EBIT ÷ Average total assets × 100'],
        solution: `Average assets are ${money(average)}. Operating ROA is ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'return-on-equity', priority: 'high', generate: (n) => {
      const netIncome = n.money(250_000, 1_700_000, 25_000)
      const beginEquity = n.money(1_600_000, 6_000_000, 50_000)
      const endEquity = beginEquity + n.money(150_000, 900_000, 25_000)
      const average = (beginEquity + endEquity) / 2
      const answer = fixed(netIncome / average * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Return on equity', question: 'Calculate return on equity (ROE).',
        statementTitle: 'Income statement and equity', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Income statement', rows: [{ label: 'Net income', value: netIncome, format: 'currency' }] },
          { title: 'Stockholders’ equity', rows: [
            { label: 'Equity — beginning', value: beginEquity, format: 'currency' },
            { label: 'Equity — ending', value: endEquity, format: 'currency' },
          ] },
        ], answer,
        hints: ['Average equity = (Beginning equity + Ending equity) ÷ 2', 'ROE = Net income ÷ Average equity × 100'],
        solution: `Average equity is ${money(average)}. ROE is ${number(answer)}%.`,
      })
    },
  },
]

