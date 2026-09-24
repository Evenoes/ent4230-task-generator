import { fixed, money, number, task, type Template } from '../core'

export const topic4Templates: Template[] = [
  {
    id: 'net-working-capital', priority: 'high', generate: (n) => {
      const cash = n.money(200_000, 850_000, 10_000)
      const ar = n.money(300_000, 1_200_000, 10_000)
      const inventory = n.money(250_000, 900_000, 10_000)
      const prepaids = n.money(30_000, 150_000, 5_000)
      const ap = n.money(200_000, 750_000, 10_000)
      const shortDebt = n.money(150_000, 650_000, 10_000)
      const accrued = n.money(50_000, 220_000, 5_000)
      const currentAssets = cash + ar + inventory + prepaids
      const currentLiabilities = ap + shortDebt + accrued
      const answer = currentAssets - currentLiabilities
      return task('currency', {
        topic: 'Topic 4', category: 'Working capital', question: 'Calculate net working capital.',
        statementTitle: 'Current balance-sheet accounts', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Current assets', rows: [
            { label: 'Cash', value: cash, format: 'currency' },
            { label: 'Accounts receivable', value: ar, format: 'currency' },
            { label: 'Inventory', value: inventory, format: 'currency' },
            { label: 'Prepaid expenses', value: prepaids, format: 'currency' },
          ] },
          { title: 'Current liabilities', rows: [
            { label: 'Accounts payable', value: ap, format: 'currency' },
            { label: 'Short-term debt', value: shortDebt, format: 'currency' },
            { label: 'Accrued liabilities', value: accrued, format: 'currency' },
          ] },
        ], answer,
        hints: ['Current assets = Add all current-asset accounts', 'Current liabilities = Add all current-liability accounts', 'Net working capital = Current assets − Current liabilities'],
        solution: `Current assets are ${money(currentAssets)} and current liabilities are ${money(currentLiabilities)}. Net working capital is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'aging-percentage', priority: 'standard', generate: (n) => {
      const current = n.money(300_000, 900_000, 10_000)
      const days31 = n.money(150_000, 500_000, 10_000)
      const days61 = n.money(80_000, 350_000, 10_000)
      const days90 = n.money(30_000, 180_000, 5_000)
      const total = current + days31 + days61 + days90
      const answer = fixed((days61 + days90) / total * 100)
      return task('percent', {
        topic: 'Topic 4', category: 'Accounts receivable aging', question: 'What percentage of receivables is more than 60 days old?',
        statementTitle: 'Accounts-receivable aging schedule', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: '0–30 days', value: current, format: 'currency' },
          { label: '31–60 days', value: days31, format: 'currency' },
          { label: '61–90 days', value: days61, format: 'currency' },
          { label: 'More than 90 days', value: days90, format: 'currency' },
          { label: 'Total accounts receivable', value: total, format: 'currency', emphasis: true },
        ] }], answer,
        hints: [
          'Amount over 60 days = 61–90 days + More than 90 days',
          'Aging percentage = Amount in selected categories ÷ Total accounts receivable × 100',
        ],
        solution: `${money(days61 + days90)} is more than 60 days old, equal to ${number(answer)}% of total accounts receivable.`,
      })
    },
  },
  {
    id: 'reorder-point', priority: 'high', generate: (n) => {
      const dailyDemand = n.whole(18, 95)
      const leadTime = n.whole(4, 18)
      const safetyStock = n.whole(40, 280, 10)
      const answer = dailyDemand * leadTime + safetyStock
      return task('units', {
        topic: 'Topic 4', category: 'Inventory management', question: 'At what inventory level should a new order be placed?',
        statementTitle: 'Reorder assumptions', statementNote: 'Units and days',
        sections: [{ rows: [
          { label: 'Average daily demand', value: dailyDemand, format: 'number' },
          { label: 'Supplier lead time', value: `${leadTime} days`, format: 'text' },
          { label: 'Safety stock', value: safetyStock, format: 'number' },
        ] }], answer,
        hints: ['Reorder point = Average daily demand × Lead time + Safety stock'],
        solution: `${dailyDemand} × ${leadTime} + ${safetyStock} = ${answer} units.`,
      })
    },
  },
  {
    id: 'eoq', priority: 'high', generate: (n) => {
      const demand = n.whole(4_000, 20_000, 500)
      const orderCost = n.whole(180, 650, 10)
      const unitCost = n.whole(120, 650, 10)
      const carryingRate = n.whole(18, 32)
      const holdingCost = unitCost * carryingRate / 100
      const answer = Math.ceil(Math.sqrt(2 * demand * orderCost / holdingCost))
      return task('units', {
        topic: 'Topic 4', category: 'Inventory management', question: 'Calculate the economic order quantity.',
        statementTitle: 'Annual inventory assumptions', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Annual demand', value: demand, format: 'number' },
          { label: 'Cost per order', value: orderCost, format: 'currency' },
          { label: 'Unit purchase cost', value: unitCost, format: 'currency' },
          { label: 'Annual carrying-cost rate', value: carryingRate, format: 'percent' },
        ] }], answer,
        hints: [
          'Holding cost per unit = Unit cost × Carrying-cost rate',
          'Economic order quantity = √[(2 × Annual demand × Cost per order) ÷ Holding cost per unit]',
          'Round units up.',
        ],
        solution: `Annual holding cost is ${money(holdingCost)} per unit. Economic order quantity is ${answer} units.`,
      })
    },
  },
  {
    id: 'trade-discounts', priority: 'high', generate: (n) => {
      const listPrice = n.money(40_000, 280_000, 1_000)
      const d1 = n.whole(15, 35, 5)
      const d2 = n.whole(8, 20, 2)
      const d3 = n.whole(3, 10)
      const factor = (1 - d1 / 100) * (1 - d2 / 100) * (1 - d3 / 100)
      const answer = listPrice * factor
      return task('currency', {
        topic: 'Topic 4', category: 'Trade discounts', question: 'Calculate the net price after all successive trade discounts.',
        statementTitle: 'Supplier price list', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'List price', value: listPrice, format: 'currency' },
          { label: 'Successive trade discounts', value: `${d1}/${d2}/${d3}`, format: 'text' },
        ] }], answer,
        hints: ['Net cost factor = (1 − d₁) × (1 − d₂) × (1 − d₃)', 'Net price = List price × Net cost factor', 'Do not add successive discounts together.'],
        solution: `The net cost factor is ${number(factor)}. The net price is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'cash-discount', priority: 'high', generate: (n) => {
      const invoice = n.money(120_000, 900_000, 5_000)
      const discount = n.whole(2, 5)
      const discountDay = n.whole(8, 15)
      const netDay = n.whole(30, 60, 5)
      const answer = invoice * (1 - discount / 100)
      return task('currency', {
        topic: 'Topic 4', category: 'Cash discounts', question: 'How much must be paid if the invoice is paid within the discount period?',
        statementTitle: 'Supplier invoice', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Invoice amount', value: invoice, format: 'currency' },
          { label: 'Payment terms', value: `${discount}/${discountDay}, net ${netDay}`, format: 'text' },
        ] }], answer,
        hints: ['Cash discount = Invoice amount × Discount rate', 'Amount paid = Invoice amount × (1 − Discount rate)'],
        solution: `The discount is ${money(invoice * discount / 100)}. The payment is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'discount-financing-cost', priority: 'high', generate: (n) => {
      const discount = n.whole(2, 5)
      const discountDay = n.whole(8, 15)
      const netDay = n.whole(30, 60, 5)
      const answer = fixed((discount / 100) / (1 - discount / 100) * 360 / (netDay - discountDay) * 100)
      return task('percent', {
        topic: 'Topic 4', category: 'Cash discounts', question: 'Calculate the annual cost of not taking the cash discount.',
        statementTitle: 'Supplier credit terms', statementNote: '360-day convention',
        sections: [{ rows: [
          { label: 'Payment terms', value: `${discount}/${discountDay}, net ${netDay}`, format: 'text' },
          { label: 'Discount percentage', value: discount, format: 'percent' },
          { label: 'Days of additional credit', value: `${netDay - discountDay} days`, format: 'text' },
        ] }], answer,
        hints: ['Financing days = Net-payment day − Discount-payment day', 'Annual cost = [Discount ÷ (1 − Discount)] × [360 ÷ Financing days] × 100'],
        solution: `The supplier finances the invoice for ${netDay - discountDay} extra days at an annualized cost of ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'simple-interest', priority: 'standard', generate: (n) => {
      const principal = n.money(250_000, 2_500_000, 10_000)
      const rate = n.whole(2, 8)
      const days = n.whole(20, 120, 5)
      const answer = principal * rate / 100 * days / 365
      return task('currency', {
        topic: 'Topic 4', category: 'Cash management', question: 'How much interest is earned during the period?',
        statementTitle: 'Interest-bearing account', statementNote: '365-day convention',
        sections: [{ rows: [
          { label: 'Principal balance', value: principal, format: 'currency' },
          { label: 'Annual interest rate', value: rate, format: 'percent' },
          { label: 'Number of days', value: days, format: 'number' },
        ] }], answer,
        hints: ['Simple interest = Principal × Annual rate × Days ÷ 365'],
        solution: `${money(principal)} × ${rate}% × ${days} ÷ 365 = ${money(answer)}.`,
      })
    },
  },
]

