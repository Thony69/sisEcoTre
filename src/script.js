function calcularTRE() {
  const monto = parseFloat(document.getElementById('monto').value);
  const plazo = parseInt(document.getElementById('plazo').value);
  const tasaAnual = parseFloat(document.getElementById('tasa').value) / 100;
  const treAnual = parseFloat(document.getElementById('tre').value) / 100;
  const mesTre = parseInt(document.getElementById('mesTre').value);

  const tasaMensual = tasaAnual / 12;
  const treMensual = treAnual / 12;

  const result = document.getElementById('resultado');
  result.innerHTML = `
    <h2>Datos ingresados</h2>
    <p><strong>Monto:</strong> $${monto.toFixed(2)}</p>
    <p><strong>Plazo:</strong> ${plazo} meses</p>
    <p><strong>Tasa fija anual:</strong> ${(tasaAnual * 100).toFixed(2)}%</p>
    <p><strong>TRE anual:</strong> ${(treAnual * 100).toFixed(2)}%</p>
    <p><strong>Aplicación de TRE desde el mes:</strong> ${mesTre}</p>
  `;

  result.innerHTML += generarTablaSAC();
  result.innerHTML += generarTablaPRICE();

  function generarTablaSAC() {
    let saldo = monto;
    const amortizacion = monto / plazo;
    let totalInteres = 0;
    let totalPagado = 0;
    let rows = `
      <tr>
        <td>0</td><td>${saldo.toFixed(2)}</td><td>–</td><td>–</td><td>–</td>
      </tr>
    `;

    for (let mes = 1; mes <= plazo; mes++) {
      const interes = saldo * (mes >= mesTre ? (tasaMensual + treMensual) : tasaMensual);
      const cuota = amortizacion + interes;
      saldo -= amortizacion;

      rows += `<tr>
        <td>${mes}</td>
        <td>${saldo.toFixed(2)}</td>
        <td>${amortizacion.toFixed(2)}</td>
        <td>${interes.toFixed(2)}</td>
        <td>${cuota.toFixed(2)}</td>
      </tr>`;

      totalInteres += interes;
      totalPagado += cuota;
    }

    return `
      <div class="sac-section">
        <h2>Método SAC</h2>
        <table>
          <tr><th>Mes</th><th>Saldo</th><th>Amortización</th><th>Interés</th><th>Cuota</th></tr>
          ${rows}
        </table>
        <div class="summary">
          <p>Total intereses: $${totalInteres.toFixed(2)}</p>
          <p>Total pagado: $${totalPagado.toFixed(2)}</p>
        </div>
      </div>
    `;
  }

  function generarTablaSACsinTRE() {
    let saldo = monto;
    const cuotaInicial = monto * tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazo));
    let totalInteres = 0;
    let totalPagado = 0;
    let rows = `
      <tr>
        <td>0</td><td>${saldo.toFixed(2)}</td><td>–</td><td>–</td><td>–</td>
      </tr>
    `;

    for (let mes = 1; mes <= plazo; mes++) {
      const interes = saldo * (mes >= mesTre ? (tasaMensual + treMensual) : tasaMensual);
      const amortizacion = cuotaInicial - interes;
      saldo -= amortizacion;

      rows += `<tr>
        <td>${mes}</td>
        <td>${saldo.toFixed(2)}</td>
        <td>${amortizacion.toFixed(2)}</td>
        <td>${interes.toFixed(2)}</td>
        <td>${cuotaInicial.toFixed(2)}</td>
      </tr>`;

      totalInteres += interes;
      totalPagado += cuotaInicial;
    }

    return `
      <div class="price-section">
        <h2>Método PRICE</h2>
        <table>
          <tr><th>Mes</th><th>Saldo</th><th>Amortización</th><th>Interés</th><th>Cuota</th></tr>
          ${rows}
        </table>
        <div class="summary">
          <p>Total intereses: $${totalInteres.toFixed(2)}</p>
          <p>Total pagado: $${totalPagado.toFixed(2)}</p>
        </div>
      </div>
    `;
  }
}