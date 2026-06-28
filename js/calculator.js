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

function initCalculator(elements) {
  const {
    amountRange,
    amountValue,
    decreaseAmount,
    increaseAmount,
    loanTerm,
    monthlyValue,
    termValue,
    totalValue
  } = elements;

  function updateCalculator() {
    const amount = Number(amountRange.value);
    const term = Number(loanTerm.value);
    const total = calculateTotalToPay(amount, term);
    const monthlyPayment = total / term;

    amountValue.textContent = formatMoney(amount);
    totalValue.textContent = formatMoney(total);
    monthlyValue.textContent = formatMoney(monthlyPayment);
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
