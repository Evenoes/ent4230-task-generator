import { money, roundTo, task, type Template } from '../core'

export const topic1Templates: Template[] = [
  {
    id: 'net-sales', priority: 'high', generate: (n) => {
      const gross = n.money(650_000, 4_800_000, 5_000)
      const returns = n.money(8_000, 95_000, 1_000)
      const answer = gross - returns
      return task('currency', {
        topic: 'Topic 1', category: 'Income statement', question: 'Calculate net sales.',
        statementTitle: 'Income statement extract', statementNote: 'Amounts in NOK',
        sections: [{ title: 'Revenue', rows: [
          { label: 'Gross sales', value: gross, format: 'currency' },
          { label: 'Less: returns and allowances', value: returns, format: 'currency' },
        ] }], answer,
        hints: ['Net sales = Gross sales − Returns and allowances'],
        solution: `${money(gross)} − ${money(returns)} = ${money(answer)}.`,
      })
    },
  },
  {
    id: 'net-income', priority: 'high', generate: (n) => {
      const sales = n.money(2_400_000, 10_000_000, 50_000)
      const cogs = roundTo(sales * n.whole(42, 62) / 100, 5_000)
      const operatingExpenses = roundTo(sales * n.whole(18, 28) / 100, 5_000)
      const interestIncome = n.money(10_000, 65_000, 5_000)
      const interestExpense = n.money(40_000, 140_000, 5_000)
      const ebt = sales - cogs - operatingExpenses + interestIncome - interestExpense
      const taxes = roundTo(ebt * n.whole(20, 25) / 100, 1_000)
      const answer = ebt - taxes
      return task('currency', {
        topic: 'Topic 1', category: 'Income statement', question: 'Calculate net income.',
        instruction: 'Build the income statement in the correct order before finding the final result.',
        statementTitle: 'Business income statement', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Operations', rows: [
            { label: 'Net sales', value: sales, format: 'currency' },
            { label: 'Cost of goods sold', value: cogs, format: 'currency' },
            { label: 'Operating expenses', value: operatingExpenses, format: 'currency' },
          ] },
          { title: 'Financial and tax', rows: [
            { label: 'Interest income', value: interestIncome, format: 'currency' },
            { label: 'Interest expense', value: interestExpense, format: 'currency' },
            { label: 'Income taxes', value: taxes, format: 'currency' },
          ] },
        ], answer,
        hints: [
          'Gross profit = Net sales − COGS',
          'EBIT = Gross profit − Operating expenses',
          'EBT = EBIT + Interest income − Interest expense',
          'Net income = EBT − Income taxes',
        ],
        solution: `Subtract COGS and operating expenses, adjust for interest, then subtract taxes. Net income is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'balance-equity', priority: 'high', generate: (n) => {
      const currentAssets = n.money(550_000, 2_600_000, 10_000)
      const fixedAssetsCost = n.money(1_500_000, 6_500_000, 25_000)
      const accumulatedDepreciation = n.money(250_000, 1_100_000, 25_000)
      const currentLiabilities = n.money(350_000, 1_200_000, 10_000)
      const longTermLiabilities = n.money(600_000, 2_100_000, 25_000)
      const answer = currentAssets + fixedAssetsCost - accumulatedDepreciation - currentLiabilities - longTermLiabilities
      return task('currency', {
        topic: 'Topic 1', category: 'Balance sheet', question: 'Calculate stockholders’ equity.',
        instruction: 'First calculate net fixed assets and total assets.',
        statementTitle: 'Balance sheet extract', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Assets', rows: [
            { label: 'Current assets', value: currentAssets, format: 'currency' },
            { label: 'Fixed assets at cost', value: fixedAssetsCost, format: 'currency' },
            { label: 'Accumulated depreciation', value: accumulatedDepreciation, format: 'currency' },
          ] },
          { title: 'Liabilities', rows: [
            { label: 'Current liabilities', value: currentLiabilities, format: 'currency' },
            { label: 'Long-term liabilities', value: longTermLiabilities, format: 'currency' },
          ] },
        ], answer,
        hints: ['Net fixed assets = Fixed assets at cost − Accumulated depreciation', 'Equity = Total assets − Total liabilities'],
        solution: `Net the fixed assets, add current assets, then subtract both liability categories. Equity is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'net-fixed-assets', priority: 'standard', generate: (n) => {
      const building = n.money(1_500_000, 5_000_000, 25_000)
      const equipment = n.money(350_000, 1_800_000, 25_000)
      const buildingDep = n.money(150_000, 800_000, 25_000)
      const equipmentDep = n.money(75_000, 300_000, 5_000)
      const answer = building + equipment - buildingDep - equipmentDep
      return task('currency', {
        topic: 'Topic 1', category: 'Fixed assets', question: 'Calculate total net fixed assets.',
        statementTitle: 'Fixed asset register', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Buildings at cost', value: building, format: 'currency' },
          { label: 'Less: accumulated depreciation — buildings', value: buildingDep, format: 'currency', indent: true },
          { label: 'Equipment at cost', value: equipment, format: 'currency' },
          { label: 'Less: accumulated depreciation — equipment', value: equipmentDep, format: 'currency', indent: true },
        ] }], answer,
        hints: ['Net fixed assets = Asset cost − Accumulated depreciation'],
        solution: `Subtract accumulated depreciation from each asset category, then add them. Total net fixed assets are ${money(answer)}.`,
      })
    },
  },
  {
    id: 'cash-received', priority: 'high', generate: (n) => {
      const sales = n.money(1_600_000, 7_500_000, 25_000)
      const beginningAr = n.money(180_000, 780_000, 10_000)
      const endingAr = beginningAr + n.money(25_000, 180_000, 5_000)
      const answer = sales - (endingAr - beginningAr)
      return task('currency', {
        topic: 'Topic 1', category: 'Operating cash flow', question: 'How much cash was received from customers?',
        statementTitle: 'Sales and receivables', statementNote: 'Amounts in NOK',
        sections: [{ rows: [
          { label: 'Net sales', value: sales, format: 'currency' },
          { label: 'Accounts receivable — beginning', value: beginningAr, format: 'currency' },
          { label: 'Accounts receivable — ending', value: endingAr, format: 'currency' },
        ] }], answer,
        hints: [
          'ΔAccounts receivable = Ending accounts receivable − Beginning accounts receivable',
          'Cash received = Net sales − ΔAccounts receivable',
        ],
        solution: `Accounts receivable increased by ${money(endingAr - beginningAr)}, so cash received was ${money(answer)}.`,
      })
    },
  },
  {
    id: 'operating-cash-flow', priority: 'high', generate: (n) => {
      const ebitda = n.money(900_000, 3_600_000, 25_000)
      const taxes = n.money(180_000, 600_000, 10_000)
      const taxPayableIncrease = n.money(15_000, 90_000, 5_000)
      const arIncrease = n.money(60_000, 250_000, 5_000)
      const inventoryIncrease = n.money(40_000, 180_000, 5_000)
      const apIncrease = n.money(25_000, 140_000, 5_000)
      const changeWc = arIncrease + inventoryIncrease - apIncrease
      const answer = ebitda - changeWc - taxes + taxPayableIncrease
      return task('currency', {
        topic: 'Topic 1', category: 'Operating cash flow', question: 'Calculate cash flow from operating activities.',
        statementTitle: 'Cash-flow adjustments', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Operations', rows: [
            { label: 'EBITDA', value: ebitda, format: 'currency', emphasis: true },
            { label: 'Income-tax expense', value: taxes, format: 'currency' },
            { label: 'Increase in taxes payable', value: taxPayableIncrease, format: 'currency' },
          ] },
          { title: 'Working capital movements', rows: [
            { label: 'Increase in accounts receivable', value: arIncrease, format: 'currency' },
            { label: 'Increase in inventory', value: inventoryIncrease, format: 'currency' },
            { label: 'Increase in accounts payable', value: apIncrease, format: 'currency' },
          ] },
        ], answer,
        hints: [
          'ΔWorking capital = ΔAccounts receivable + ΔInventory − ΔAccounts payable',
          'Operating cash flow = EBITDA − ΔWorking capital − Income taxes + ΔTaxes payable',
        ],
        solution: `The working-capital increase is ${money(changeWc)}. After tax adjustments, operating cash flow is ${money(answer)}.`,
      })
    },
  },
  {
    id: 'ending-cash', priority: 'standard', generate: (n) => {
      const operatingCash = n.money(650_000, 2_400_000, 25_000)
      const capex = n.money(300_000, 1_100_000, 25_000)
      const interestIncome = n.money(10_000, 50_000, 5_000)
      const interestExpense = n.money(35_000, 125_000, 5_000)
      const equityIssued = n.money(250_000, 900_000, 25_000)
      const newDebt = n.money(200_000, 750_000, 25_000)
      const debtRepaid = n.money(100_000, 450_000, 25_000)
      const beginningCash = n.money(180_000, 700_000, 10_000)
      const freeCash = operatingCash - capex
      const financing = interestIncome - interestExpense + equityIssued + newDebt - debtRepaid
      const answer = beginningCash + freeCash + financing
      return task('currency', {
        topic: 'Topic 1', category: 'Cash-flow statement', question: 'Calculate the ending cash balance.',
        instruction: 'Calculate free cash flow and financing cash flow before updating cash.',
        statementTitle: 'Statement of cash flows', statementNote: 'Amounts in NOK',
        sections: [
          { title: 'Operating and investing', rows: [
            { label: 'Cash flow from operating activities', value: operatingCash, format: 'currency' },
            { label: 'Capital expenditures', value: capex, format: 'currency' },
          ] },
          { title: 'Financing', rows: [
            { label: 'Interest income', value: interestIncome, format: 'currency' },
            { label: 'Interest expense', value: interestExpense, format: 'currency' },
            { label: 'Equity issued', value: equityIssued, format: 'currency' },
            { label: 'New debt', value: newDebt, format: 'currency' },
            { label: 'Debt repaid', value: debtRepaid, format: 'currency' },
            { label: 'Beginning cash balance', value: beginningCash, format: 'currency', emphasis: true },
          ] },
        ], answer,
        hints: ['Free cash flow = Operating cash flow − Capital expenditures', 'Financing cash flow = Interest income − Interest expense + Equity issued + New debt − Debt repaid', 'Ending cash = Beginning cash + Free cash flow + Financing cash flow'],
        solution: `Free cash flow is ${money(freeCash)} and financing cash flow is ${money(financing)}. Ending cash is ${money(answer)}.`,
      })
    },
  },
]

