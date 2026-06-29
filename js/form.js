function initLoanForm(elements, calculatorController) {
  const { amountRange, formResult, loanForm, loanTerm } = elements;

  function buildAmortizationRows(schedule) {
    return schedule
      .map((installment) => `
        <tr>
          <td>${installment.number}</td>
          <td>${formatMoney(installment.principal)}</td>
          <td>${formatMoney(installment.interest)}</td>
          <td>${formatMoney(installment.payment)}</td>
          <td>${formatMoney(installment.balance)}</td>
        </tr>
      `)
      .join("");
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(loanForm);
    const applicantName = formData.get("fullName").trim();
    const purpose = formData.get("purpose");
    const amount = Number(amountRange.value);
    const term = Number(loanTerm.value);
    const quote = calculateLoanQuote(amount, term);
    const schedule = createAmortizationSchedule(amount, term);

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
        <p><span>Interés estimado</span><strong>${formatMoney(quote.interest)}</strong></p>
        <p><span>Total estimado</span><strong>${formatMoney(quote.total)}</strong></p>
      </div>
      <div class="amortization-block">
        <h4>Amortización estimada</h4>
        <div class="amortization-table-wrap">
          <table class="amortization-table">
            <thead>
              <tr>
                <th>Cuota</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>Pago</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${buildAmortizationRows(schedule)}
            </tbody>
          </table>
        </div>
      </div>
      <p class="result-note">Un asesor de Crediflash se pondrá en contacto para completar la evaluación.</p>
    `;
    formResult.classList.add("is-visible");
    loanForm.reset();
    calculatorController.updateCalculator();
    formResult.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  loanForm.addEventListener("submit", handleFormSubmit);
}
