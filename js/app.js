function getPageElements() {
  return {
    amountRange: document.querySelector("#amountRange"),
    amountValue: document.querySelector("#amountValue"),
    decreaseAmount: document.querySelector("#decreaseAmount"),
    formResult: document.querySelector("#formResult"),
    increaseAmount: document.querySelector("#increaseAmount"),
    interestValue: document.querySelector("#interestValue"),
    loanForm: document.querySelector("#loanForm"),
    loanTerm: document.querySelector("#loanTerm"),
    menuButton: document.querySelector(".menu-button"),
    monthlyValue: document.querySelector("#monthlyValue"),
    navLinks: document.querySelector(".nav-links"),
    termValue: document.querySelector("#termValue"),
    totalValue: document.querySelector("#totalValue")
  };
}

function initApp() {
  const elements = getPageElements();
  const calculatorController = initCalculator(elements);

  initLoanForm(elements, calculatorController);
  initNavigation(elements);
}

initApp();
