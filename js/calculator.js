function calculateTotalToPay(amount, term) {
  let total;

  if (amount < 5000) {
    total = amount * 1.5;
  } else if (amount >= 5000 && amount < 10000) {
    total = amount * 1.4;
  } else if (amount >= 10000 && amount < 15000) {
    total = amount * 1.3;
  } else {
    total = amount * 1.2;
  }

  if (term === 6) {
    total *= 1.1;
  } else if (term === 12) {
    total *= 1.2;
  } else {
    total *= 1.3;
  }

  return total;
}

function roundToCents(value) {
  return Math.round(value * 100);
}

function centsToMoney(cents) {
  return cents / 100;
}

function calculateLoanQuote(amount, term) {
  const amountCents = roundToCents(amount);
  const totalCents = roundToCents(calculateTotalToPay(amount, term));
  const interestCents = totalCents - amountCents;

  return {
    amount: centsToMoney(amountCents),
    interest: centsToMoney(interestCents),
    monthlyPayment: centsToMoney(totalCents / term),
    term,
    total: centsToMoney(totalCents)
  };
}

function createAmortizationSchedule(amount, term) {
  const quote = calculateLoanQuote(amount, term);
  const amountCents = roundToCents(quote.amount);
  const interestCents = roundToCents(quote.interest);
  const principalBaseCents = Math.floor(amountCents / term);
  const principalRemainderCents = amountCents % term;
  const interestBaseCents = Math.floor(interestCents / term);
  const interestRemainderCents = interestCents % term;
  let paidPrincipalCents = 0;

  return Array.from({ length: term }, (_, index) => {
    const installmentNumber = index + 1;
    const principalCents =
      principalBaseCents + (index < principalRemainderCents ? 1 : 0);
    const interestCentsForInstallment =
      interestBaseCents + (index < interestRemainderCents ? 1 : 0);
    const paymentCents = principalCents + interestCentsForInstallment;

    paidPrincipalCents += principalCents;

    return {
      balance: centsToMoney(Math.max(amountCents - paidPrincipalCents, 0)),
      interest: centsToMoney(interestCentsForInstallment),
      number: installmentNumber,
      payment: centsToMoney(paymentCents),
      principal: centsToMoney(principalCents)
    };
  });
}

function initCalculator(elements) {
  const {
    amountRange,
    amountValue,
    decreaseAmount,
    increaseAmount,
    interestValue,
    loanTerm,
    monthlyValue,
    termValue,
    totalValue
  } = elements;

  function updateCalculator() {
    const amount = Number(amountRange.value);
    const term = Number(loanTerm.value);
    const quote = calculateLoanQuote(amount, term);

    amountValue.textContent = formatMoney(amount);
    interestValue.textContent = formatMoney(quote.interest);
    totalValue.textContent = formatMoney(quote.total);
    monthlyValue.textContent = formatMoney(quote.monthlyPayment);
    termValue.textContent = `${term} meses`;
  }

  function changeAmount(operator) {
    const currentAmount = Number(amountRange.value);
    const nextAmount = currentAmount + operator * STEP_AMOUNT;

    if (nextAmount < MIN_AMOUNT || nextAmount > MAX_AMOUNT) {
      alert("Cantidad no válida. El monto debe estar entre RD$100 y RD$20,000.");
      return;
    }

    amountRange.value = nextAmount;
    updateCalculator();
  }

  function handleDecreaseAmountClick() {
    changeAmount(-1);
  }

  function handleIncreaseAmountClick() {
    changeAmount(1);
  }

  amountRange.addEventListener("input", updateCalculator);
  loanTerm.addEventListener("change", updateCalculator);
  decreaseAmount.addEventListener("click", handleDecreaseAmountClick);
  increaseAmount.addEventListener("click", handleIncreaseAmountClick);
  updateCalculator();

  return {
    updateCalculator
  };
}
