export function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function round2(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function monthlyPayment(params: {
  principal: number;
  annualRatePercent: number;
  termMonths: number;
}) {
  const principal = Math.max(0, params.principal);
  const termMonths = Math.max(1, Math.floor(params.termMonths));
  const r = Math.max(0, params.annualRatePercent) / 100 / 12;

  if (r === 0) return principal / termMonths;

  const pow = Math.pow(1 + r, termMonths);
  return (principal * r * pow) / (pow - 1);
}

export type AmortRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export function amortizationSchedule(params: {
  principal: number;
  annualRatePercent: number;
  termMonths: number;
}) {
  const payment = monthlyPayment(params);
  const r = Math.max(0, params.annualRatePercent) / 100 / 12;
  let balance = Math.max(0, params.principal);
  const termMonths = Math.max(1, Math.floor(params.termMonths));

  const rows: AmortRow[] = [];
  for (let i = 1; i <= termMonths; i += 1) {
    const interest = r === 0 ? 0 : balance * r;
    let principalPart = payment - interest;
    if (principalPart > balance) principalPart = balance;
    const nextBalance = balance - principalPart;

    rows.push({
      month: i,
      payment: round2(principalPart + interest),
      principal: round2(principalPart),
      interest: round2(interest),
      balance: round2(nextBalance),
    });

    balance = nextBalance;
    if (balance <= 0) break;
  }

  return rows;
}

export type CompoundYearRow = {
  year: number;
  contributed: number;
  interest: number;
  endBalance: number;
};

export function compoundProjection(params: {
  initial: number;
  monthlyContribution: number;
  annualRatePercent: number;
  years: number;
  compoundsPerYear: number;
}) {
  const initial = Math.max(0, params.initial);
  const monthlyContribution = Math.max(0, params.monthlyContribution);
  const years = Math.max(1, Math.floor(params.years));
  const compoundsPerYear = clampNumber(
    Math.floor(params.compoundsPerYear),
    1,
    365,
  );
  const annualRate = Math.max(0, params.annualRatePercent) / 100;

  const months = years * 12;
  const periodRate = annualRate / compoundsPerYear;
  const monthsPerPeriod = 12 / compoundsPerYear;

  let balance = initial;
  let contributed = initial;
  let lastPeriodBoundary = 0;

  const rows: CompoundYearRow[] = [];
  for (let m = 1; m <= months; m += 1) {
    balance += monthlyContribution;
    contributed += monthlyContribution;

    const periodIndex = Math.floor(m / monthsPerPeriod);
    if (periodIndex > lastPeriodBoundary) {
      const delta = periodIndex - lastPeriodBoundary;
      const factor = Math.pow(1 + periodRate, delta);
      balance *= factor;
      lastPeriodBoundary = periodIndex;
    }

    if (m % 12 === 0) {
      const year = m / 12;
      const interestEarned = balance - contributed;
      rows.push({
        year,
        contributed: round2(contributed),
        interest: round2(interestEarned),
        endBalance: round2(balance),
      });
    }
  }

  const endBalance = round2(balance);
  const totalContributed = round2(contributed);
  const totalInterest = round2(endBalance - totalContributed);

  return { rows, endBalance, totalContributed, totalInterest };
}
