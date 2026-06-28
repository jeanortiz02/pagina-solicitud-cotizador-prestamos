const MIN_AMOUNT = 100;
const MAX_AMOUNT = 20000;
const STEP_AMOUNT = 100;

const amountRange = document.querySelector("#amountRange");
const decreaseAmount = document.querySelector("#decreaseAmount");
const increaseAmount = document.querySelector("#increaseAmount");
const loanTerm = document.querySelector("#loanTerm");
const amountValue = document.querySelector("#amountValue");
const totalValue = document.querySelector("#totalValue");
const monthlyValue = document.querySelector("#monthlyValue");
const termValue = document.querySelector("#termValue");
const loanForm = document.querySelector("#loanForm");
const formResult = document.querySelector("#formResult");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

function formatMoney(value) {
  const formatter = new Intl.NumberFormat("es-DO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

  return `RD$${formatter}`;
}

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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(loanForm);
  const applicantName = formData.get("fullName").trim();
  const purpose = formData.get("purpose");
  const amount = Number(amountRange.value);
  const term = Number(loanTerm.value);
  const total = calculateTotalToPay(amount, term);

  formResult.innerHTML = `
    <div class="result-header">
      <span class="result-icon">✓</span>
      <div>
        <h3>Solicitud recibida</h3>
        <p>Estos son los datos principales de la solicitud enviada.</p>
      </div>
    </div>
    <div class="result-details">
      <p><span>Cliente</span><strong>${escapeHtml(applicantName)}</strong></p>
      <p><span>Motivo</span><strong>${escapeHtml(purpose)}</strong></p>
      <p><span>Monto solicitado</span><strong>${formatMoney(amount)}</strong></p>
      <p><span>Plazo</span><strong>${term} meses</strong></p>
      <p><span>Total estimado</span><strong>${formatMoney(total)}</strong></p>
    </div>
    <p class="result-note">Un asesor de Crediflash se pondrá en contacto para completar la evaluación.</p>
  `;
  formResult.classList.add("is-visible");
  loanForm.reset();
  updateCalculator();
  formResult.scrollIntoView({ behavior: "smooth", block: "center" });
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
}

amountRange.addEventListener("input", updateCalculator);
loanTerm.addEventListener("change", updateCalculator);
decreaseAmount.addEventListener("click", () => changeAmount(-1));
increaseAmount.addEventListener("click", () => changeAmount(1));
loanForm.addEventListener("submit", handleFormSubmit);
menuButton.addEventListener("click", toggleMenu);
navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

updateCalculator();
