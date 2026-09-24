import { fixed, money, number, roundTo, task, type Template } from '../core'

export const topic3Templates: Template[] = [
  {
    id: 'break-even-units', priority: 'high', generate: (n) => {
      const price = n.whole(2_200, 5_000, 50)
      const materials = n.whole(180, 700, 10)
      const laborHours = n.whole(1, 4)
      const wage = n.whole(180, 320, 10)
      const variable = materials + laborHours * wage
      const fixedCosts = n.money(250_000, 1_100_000, 10_000)
      const answer = Math.ceil(fixedCosts / (price - variable))
      return task('units', {
        topic: 'Topic 3', category: 'Break-even analysis', question: 'How many units must be sold to break even?',
        statementTitle: 'Product economics', statementNote: 'Monthly figures',
        sections: [
          { title: 'Per unit', rows: [
            { label: 'Sales price', value: price, format: 'currency' },
            { label: 'Materials', value: materials, format: 'currency' },
            { label: 'Labour hours', value: laborHours, format: 'number' },
            { label: 'Hourly wage', value: wage, format: 'currency' },
          ] },
          { title: 'Monthly', rows: [{ label: 'Fixed costs', value: fixedCosts, format: 'currency' }] },
        ], answer,
        hints: ['Variable cost per unit = Materials + Labour hours × Hourly wage', 'Contribution margin per unit = Price − Variable cost per unit', 'Break-even units = Fixed costs ÷ Contribution margin per unit', 'Always round units up.'],
        solution: `Variable cost is ${money(variable)} and contribution margin is ${money(price - variable)} per unit. Break-even is ${answer} units.`,
      })
    },
  },
  {
    id: 'target-profit-sales', priority: 'high', generate: (n) => {
      const fixedCosts = n.money(350_000, 1_500_000, 25_000)
      const variableRate = n.whole(48, 72)
      const targetProfit = n.money(150_000, 750_000, 25_000)
      const marginRate = 1 - variableRate / 100
      const answer = (fixedCosts + targetProfit) / marginRate
      return task('currency', {
        topic: 'Topic 3', category: 'Break-even analysis', question: 'How much sales revenue is required to reach the target profit?',
        statementTitle: 'Target-profit assumptions', statementNote: 'Monthly figures',
        sections: [{ rows: [
          { label: 'Fixed costs', value: fixedCosts, format: 'currency' },
          { label: 'Variable costs as percentage of sales', value: variableRate, format: 'percent' },
          { label: 'Target profit', value: targetProfit, format: 'currency' },
        ] }], answer,
        hints: ['Contribution margin ratio = 1 − Variable-cost percentage', 'Required sales = (Fixed costs + Target profit) ÷ Contribution margin ratio'],
        solution: `The contribution margin ratio is ${number(marginRate * 100)}%. Required sales are ${money(answer)}.`,
      })
    },
  },
  {
    id: 'contribution-margin', priority: 'standard', generate: (n) => {
      const price = n.whole(500, 2_500, 50)
      const variable = n.whole(180, Math.max(200, price - 200), 10)
      const answer = fixed((price - variable) / price * 100)
      return task('percent', {
        topic: 'Topic 3', category: 'Contribution margin', question: 'Calculate the contribution margin ratio.',
        statementTitle: 'Unit economics', statementNote: 'Amounts per unit',
        sections: [{ rows: [
          { label: 'Sales price', value: price, format: 'currency' },
          { label: 'Variable cost', value: variable, format: 'currency' },
        ] }], answer,
        hints: ['Contribution margin per unit = Price − Variable cost', 'Contribution margin ratio = Contribution margin per unit ÷ Price × 100'],
        solution: `Contribution margin is ${money(price - variable)} per unit, equal to ${number(answer)}%.`,
      })
    },
  },
  {
    id: 'moving-average', priority: 'standard', generate: (n) => {
      const first = n.money(700_000, 1_500_000, 10_000)
      const second = n.money(700_000, 1_500_000, 10_000)
      const third = n.money(700_000, 1_500_000, 10_000)
      const answer = (first + second + third) / 3
      return task('currency', {
        topic: 'Topic 3', category: 'Forecasting', question: 'Calculate the three-month moving-average sales forecast for April.',
        statementTitle: 'Actual monthly sales', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'January', value: first, format: 'currency' },
          { label: 'February', value: second, format: 'currency' },
          { label: 'March', value: third, format: 'currency' },
        ] }], answer,
        hints: ['Moving-average forecast = Sum of the latest n observations ÷ n'],
        solution: `Add the three months and divide by three. The April forecast is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'weighted-average', priority: 'standard', generate: (n) => {
      const jan = n.money(650_000, 1_500_000, 10_000)
      const feb = n.money(650_000, 1_500_000, 10_000)
      const mar = n.money(650_000, 1_500_000, 10_000)
      const answer = jan * 0.2 + feb * 0.3 + mar * 0.5
      return task('currency', {
        topic: 'Topic 3', category: 'Forecasting', question: 'Calculate the weighted-moving-average forecast for April.',
        statementTitle: 'Sales and forecast weights', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'January sales — weight 20%', value: jan, format: 'currency' },
          { label: 'February sales — weight 30%', value: feb, format: 'currency' },
          { label: 'March sales — weight 50%', value: mar, format: 'currency' },
        ] }], answer,
        hints: ['Weighted forecast = Σ(Observation × Weight)', 'The weights must add to 100%.'],
        solution: `Multiply each month by its weight and add the results. The forecast is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'exponential-smoothing', priority: 'standard', generate: (n) => {
      const previousForecast = n.money(700_000, 1_600_000, 10_000)
      const previousActual = n.money(700_000, 1_600_000, 10_000)
      const alphaPercent = n.whole(10, 60, 10)
      const alpha = alphaPercent / 100
      const answer = previousForecast + alpha * (previousActual - previousForecast)
      return task('currency', {
        topic: 'Topic 3', category: 'Forecasting', question: 'Calculate the next exponential-smoothing forecast.',
        statementTitle: 'Forecast inputs', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Previous forecast', value: previousForecast, format: 'currency' },
          { label: 'Previous actual sales', value: previousActual, format: 'currency' },
          { label: 'Smoothing factor α', value: alphaPercent, format: 'percent' },
        ] }], answer,
        hints: ['New forecast = Previous forecast + α × (Previous actual − Previous forecast)'],
        solution: `Apply α to the previous forecast error. The new forecast is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'mad', priority: 'standard', generate: (n) => {
      const actuals = [n.whole(720, 1_280, 10), n.whole(720, 1_280, 10), n.whole(720, 1_280, 10)]
      const forecasts = actuals.map((actual) => actual + n.whole(-120, 120, 10))
      const deviations = actuals.map((actual, index) => Math.abs(actual - forecasts[index]))
      const answer = fixed(deviations.reduce((sum, value) => sum + value, 0) / 3)
      return task('number', {
        topic: 'Topic 3', category: 'Forecast accuracy', question: 'Calculate mean absolute deviation.',
        statementTitle: 'Actual and forecast sales', statementNote: 'Amounts in NOK thousands',
        sections: [{ rows: actuals.flatMap((actual, index) => [
          { label: `Month ${index + 1} — actual`, value: actual, format: 'number' as const },
          { label: `Month ${index + 1} — forecast`, value: forecasts[index], format: 'number' as const, indent: true },
        ]) }], answer,
        hints: [
          'Absolute deviation = |Actual − Forecast|',
          'Mean absolute deviation = Sum of absolute deviations ÷ Number of forecasts',
        ],
        solution: `The absolute deviations are ${deviations.join(', ')}. Their average is ${number(answer)}.`,
      })
    },
  },
  {
    id: 'percentage-sales', priority: 'standard', generate: (n) => {
      const currentSales = n.money(2_500_000, 9_000_000, 50_000)
      const currentItem = roundTo(currentSales * n.whole(8, 28) / 100, 5_000)
      const forecastSales = currentSales + n.money(350_000, 2_500_000, 25_000)
      const answer = currentItem / currentSales * forecastSales
      return task('currency', {
        topic: 'Topic 3', category: 'Pro forma forecasting', question: 'Forecast accounts receivable using the percentage-of-sales method.',
        statementTitle: 'Forecast assumptions', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Current sales', value: currentSales, format: 'currency' },
          { label: 'Current accounts receivable', value: currentItem, format: 'currency' },
          { label: 'Forecast sales', value: forecastSales, format: 'currency' },
        ] }], answer,
        hints: [
          'Current accounts receivable percentage = Current accounts receivable ÷ Current sales',
          'Forecast accounts receivable = Current accounts receivable percentage × Forecast sales',
        ],
        solution: `Apply the current accounts-receivable-to-sales percentage to forecast sales. Forecast accounts receivable is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'financing-required', priority: 'high', generate: (n) => {
      const currentSales = n.money(5_000_000, 12_000_000, 100_000)
      const forecastSales = currentSales + n.money(2_000_000, 5_000_000, 100_000)
      const assetRate = n.whole(75, 95)
      const liabilityRate = n.whole(22, 42)
      const margin = n.whole(5, 11)
      const payout = n.whole(45, 75)
      const deltaSales = forecastSales - currentSales
      const answer = deltaSales * assetRate / 100 - deltaSales * liabilityRate / 100 - forecastSales * margin / 100 * (1 - payout / 100)
      return task('currency', {
        topic: 'Topic 3', category: 'Financing requirement', question: 'Calculate the required new financing.',
        statementTitle: 'Pro forma financing assumptions', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Sales', rows: [
            { label: 'Current sales', value: currentSales, format: 'currency' },
            { label: 'Forecast sales', value: forecastSales, format: 'currency' },
          ] },
          { title: 'Ratios', rows: [
            { label: 'Assets as percentage of sales', value: assetRate, format: 'percent' },
            { label: 'Liabilities as percentage of sales', value: liabilityRate, format: 'percent' },
            { label: 'Forecast profit margin', value: margin, format: 'percent' },
            { label: 'Owner payout ratio', value: payout, format: 'percent' },
          ] },
        ], answer,
        hints: ['ΔSales = Forecast sales − Current sales', 'Required financing = ΔSales(Assets ÷ Sales) − ΔSales(Liabilities ÷ Sales) − Forecast sales × Profit margin × (1 − Payout ratio)'],
        solution: `After asset needs, spontaneous liabilities, and retained earnings, required financing is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'cash-budget', priority: 'high', generate: (n) => {
      const twoMonthsAgo = n.money(700_000, 1_600_000, 10_000)
      const previous = n.money(700_000, 1_600_000, 10_000)
      const current = n.money(700_000, 1_600_000, 10_000)
      const answer = current * 0.2 + previous * 0.8 * 0.6 + twoMonthsAgo * 0.8 * 0.4
      return task('currency', {
        topic: 'Topic 3', category: 'Cash budget', question: 'Calculate total cash receipts for the current month.',
        instruction: '20% of each month’s sales are cash sales. The remaining 80% are credit sales.',
        statementTitle: 'Sales and collection pattern', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Sales', rows: [
            { label: 'Sales — two months ago', value: twoMonthsAgo, format: 'currency' },
            { label: 'Sales — previous month', value: previous, format: 'currency' },
            { label: 'Sales — current month', value: current, format: 'currency' },
          ] },
          { title: 'Credit collection', rows: [
            { label: 'Collected one month after sale', value: 60, format: 'percent' },
            { label: 'Collected two months after sale', value: 40, format: 'percent' },
          ] },
        ], answer,
        hints: ['Current cash sales = Current sales × 20%', 'Previous-month collection = Previous sales × 80% × 60%', 'Two-month collection = Sales two months ago × 80% × 40%', 'Total receipts = Add all three amounts'],
        solution: `Add current cash sales and both credit collections. Total receipts are ${money(answer)}.`,
      })
    },
  },
]

