import { fixed, money, number, roundTo, task, type Template } from '../core'

export const topic2RatioTemplates: Template[] = [
  {
    id: 'debt-equity', priority: 'high', generate: (n) => {
      const liabilities = n.money(1_200_000, 7_000_000, 50_000)
      const equity = n.money(900_000, 5_000_000, 50_000)
      const answer = fixed(liabilities / equity)
      return task('ratio', {
        topic: 'Topic 2', category: 'Leverage ratio', question: 'What is the debt-to-equity ratio?',
        statementTitle: 'Balance sheet extract', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Total liabilities', value: liabilities, format: 'currency' },
          { label: 'Stockholders’ equity', value: equity, format: 'currency' },
        ] }], answer,
        hints: ['Debt-to-equity ratio = Total liabilities ÷ Stockholders’ equity'],
        solution: `${money(liabilities)} ÷ ${money(equity)} = ${number(answer)}.`,
      })
    },
  },
  {
    id: 'debt-assets', priority: 'high', generate: (n) => {
      const assets = n.money(3_000_000, 12_000_000, 50_000)
      const liabilities = roundTo(assets * n.whole(28, 72) / 100, 25_000)
      const answer = fixed(liabilities / assets * 100)
      return task('percent', {
        topic: 'Topic 2', category: 'Leverage ratio', question: 'What percentage of assets is financed by liabilities?',
        statementTitle: 'Balance sheet extract', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Total assets', value: assets, format: 'currency' },
          { label: 'Total liabilities', value: liabilities, format: 'currency' },
        ] }], answer,
        hints: ['Debt-to-total-assets ratio = Total liabilities ÷ Total assets × 100'],
        solution: `${money(liabilities)} ÷ ${money(assets)} × 100 = ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'interest-coverage', priority: 'high', generate: (n) => {
      const interest = n.money(80_000, 420_000, 10_000)
      const ebit = interest * n.whole(3, 11)
      const answer = fixed(ebit / interest)
      return task('ratio', {
        topic: 'Topic 2', category: 'Interest coverage', question: 'Calculate the interest coverage ratio.',
        statementTitle: 'Income statement extract', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Operating income (EBIT)', value: ebit, format: 'currency' },
          { label: 'Interest expense', value: interest, format: 'currency' },
        ] }], answer,
        hints: ['Interest coverage ratio = EBIT ÷ Interest expense'],
        solution: `${money(ebit)} ÷ ${money(interest)} = ${number(answer)} times.`,
      })
    },
  },
  {
    id: 'current-ratio', priority: 'high', generate: (n) => {
      const liabilities = n.money(400_000, 2_400_000, 25_000)
      const assets = liabilities + n.money(250_000, 2_600_000, 25_000)
      const answer = fixed(assets / liabilities)
      return task('ratio', {
        topic: 'Topic 2', category: 'Liquidity ratio', question: 'Calculate the current ratio.',
        statementTitle: 'Current balance-sheet accounts', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Current assets', value: assets, format: 'currency' },
          { label: 'Current liabilities', value: liabilities, format: 'currency' },
        ] }], answer,
        hints: ['Current ratio = Current assets ÷ Current liabilities'],
        solution: `${money(assets)} ÷ ${money(liabilities)} = ${number(answer)}.`,
      })
    },
  },
  {
    id: 'quick-ratio', priority: 'high', generate: (n) => {
      const cash = n.money(180_000, 900_000, 10_000)
      const ar = n.money(250_000, 1_200_000, 10_000)
      const inventory = n.money(200_000, 850_000, 10_000)
      const prepaids = n.money(30_000, 160_000, 5_000)
      const currentAssets = cash + ar + inventory + prepaids
      const liabilities = n.money(380_000, 1_500_000, 10_000)
      const answer = fixed((currentAssets - inventory - prepaids) / liabilities)
      return task('ratio', {
        topic: 'Topic 2', category: 'Liquidity ratio', question: 'Calculate the quick ratio.',
        statementTitle: 'Current balance-sheet accounts', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Current assets', rows: [
            { label: 'Cash and marketable securities', value: cash, format: 'currency' },
            { label: 'Accounts receivable', value: ar, format: 'currency' },
            { label: 'Inventory', value: inventory, format: 'currency' },
            { label: 'Prepaid expenses', value: prepaids, format: 'currency' },
            { label: 'Total current assets', value: currentAssets, format: 'currency', emphasis: true },
          ] },
          { title: 'Current liabilities', rows: [{ label: 'Total current liabilities', value: liabilities, format: 'currency' }] },
        ], answer,
        hints: ['Quick ratio = (Current assets − Inventory − Prepaid expenses) ÷ Current liabilities'],
        solution: `Quick assets are ${money(cash + ar)}. The quick ratio is ${number(answer)}.`,
      })
    },
  },
  {
    id: 'inventory-turnover', priority: 'high', generate: (n) => {
      const beginning = n.money(220_000, 900_000, 10_000)
      const ending = n.money(230_000, 950_000, 10_000)
      const average = (beginning + ending) / 2
      const cogs = roundTo(average * n.whole(4, 11), 5_000)
      const answer = fixed(cogs / average)
      return task('ratio', {
        topic: 'Topic 2', category: 'Activity ratio', question: 'Calculate inventory turnover.',
        statementTitle: 'Inventory and cost of sales', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Cost of goods sold', value: cogs, format: 'currency' },
          { label: 'Beginning inventory', value: beginning, format: 'currency' },
          { label: 'Ending inventory', value: ending, format: 'currency' },
        ] }], answer,
        hints: ['Average inventory = (Beginning inventory + Ending inventory) ÷ 2', 'Inventory turnover = COGS ÷ Average inventory'],
        solution: `Average inventory is ${money(average)}. Turnover is ${number(answer)} times.`,
      })
    },
  },
  {
    id: 'collection-period', priority: 'high', generate: (n) => {
      const beginning = n.money(250_000, 900_000, 10_000)
      const ending = n.money(270_000, 980_000, 10_000)
      const average = (beginning + ending) / 2
      const sales = roundTo(average * n.whole(5, 12), 5_000)
      const turnover = sales / average
      const answer = fixed(365 / turnover, 1)
      return task('days', {
        topic: 'Topic 2', category: 'Accounts receivable', question: 'Calculate the average collection period.',
        instruction: 'First calculate accounts-receivable turnover.',
        statementTitle: 'Credit sales and receivables', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Annual credit sales', value: sales, format: 'currency' },
          { label: 'Accounts receivable — beginning', value: beginning, format: 'currency' },
          { label: 'Accounts receivable — ending', value: ending, format: 'currency' },
        ] }], answer,
        hints: [
          'Average accounts receivable = (Beginning accounts receivable + Ending accounts receivable) ÷ 2',
          'Accounts receivable turnover = Credit sales ÷ Average accounts receivable',
          'Average collection period = 365 ÷ Accounts receivable turnover',
        ],
        solution: `Accounts receivable turnover is ${number(turnover)}. The average collection period is ${number(answer)} days.`,
      })
    },
  },
  {
    id: 'total-asset-turnover', priority: 'standard', generate: (n) => {
      const beginning = n.money(3_000_000, 9_000_000, 50_000)
      const ending = beginning + n.money(200_000, 1_300_000, 25_000)
      const sales = n.money(4_000_000, 16_000_000, 50_000)
      const average = (beginning + ending) / 2
      const answer = fixed(sales / average)
      return task('ratio', {
        topic: 'Topic 2', category: 'Activity ratio', question: 'Calculate total-asset turnover.',
        statementTitle: 'Sales and total assets', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Net sales', value: sales, format: 'currency' },
          { label: 'Total assets — beginning', value: beginning, format: 'currency' },
          { label: 'Total assets — ending', value: ending, format: 'currency' },
        ] }], answer,
        hints: ['Average total assets = (Beginning assets + Ending assets) ÷ 2', 'Total-asset turnover = Net sales ÷ Average total assets'],
        solution: `Average assets are ${money(average)}. Total-asset turnover is ${number(answer)}.`,
      })
    },
  },
  {
    id: 'eps', priority: 'high', generate: (n) => {
      const income = n.money(1_000_000, 8_000_000, 50_000)
      const dividends = n.money(80_000, 500_000, 10_000)
      const shares = n.whole(250_000, 2_000_000, 50_000)
      const answer = fixed((income - dividends) / shares)
      return task('number', {
        topic: 'Topic 2', category: 'Earnings per share', question: 'Calculate earnings per share (EPS).',
        statementTitle: 'Shareholder information', statementNote: 'Amounts in NOK except shares',
        sections: [{ rows: [
          { label: 'Net income', value: income, format: 'currency' },
          { label: 'Preferred dividends', value: dividends, format: 'currency' },
          { label: 'Weighted-average common shares', value: shares, format: 'number' },
        ] }], answer,
        hints: ['EPS = (Net income − Preferred dividends) ÷ Weighted-average common shares'],
        solution: `Income available to common shareholders is ${money(income - dividends)}. EPS is ${number(answer)}.`,
      })
    },
  },
  {
    id: 'fcf-per-share', priority: 'standard', generate: (n) => {
      const operatingCash = n.money(1_200_000, 7_000_000, 50_000)
      const capex = n.money(350_000, 2_000_000, 25_000)
      const shares = n.whole(300_000, 2_500_000, 50_000)
      const freeCash = operatingCash - capex
      const answer = fixed(freeCash / shares)
      return task('number', {
        topic: 'Topic 2', category: 'Free cash flow per share', question: 'Calculate free cash flow per share.',
        statementTitle: 'Cash flow and share information', statementNote: 'Amounts in NOK except shares',
        sections: [{ rows: [
          { label: 'Operating cash flow', value: operatingCash, format: 'currency' },
          { label: 'Capital expenditures', value: capex, format: 'currency' },
          { label: 'Average common shares outstanding', value: shares, format: 'number' },
        ] }], answer,
        hints: [
          'Free cash flow = Operating cash flow − Capital expenditures',
          'Free cash flow per share = Free cash flow ÷ Average common shares',
        ],
        solution: `Free cash flow is ${money(freeCash)}. Free cash flow per share is ${number(answer)}.`,
      })
    },
  },
]

