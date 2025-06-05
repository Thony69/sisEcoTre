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
    <p><strong>Plazo:</strong> ${plazo} años</p>
    <p><strong>Plazo:</strong> ${plazo*12} meses</p>
    <p><strong>Tasa fija anual:</strong> ${(tasaAnual * 100).toFixed(2)}%</p>
    <p><strong>TRE anual:</strong> ${(treAnual * 100).toFixed(2)}%</p>
    <p><strong>Aplicación de TRE desde el mes:</strong> ${mesTre}</p>
  `;

  result.innerHTML += generarTablaSAC();
  result.innerHTML += generarTablaSACsinTRE();
// 5% de interes 0.05
//console.log(tasaAnual);
// es 0.05 / 12
//console.log(tasaMensual);
  function generarTablaSAC() {
    let tiempo = plazo*12;
    let saldo = monto;
    const amortizacion = monto / tiempo;
    let totalInteres = 0;
    let totalPagado = 0;
    let tasaMensualconTRE =  (tasaAnual - 0.02)+treMensual;
    console.log(tasaMensualconTRE);
    let rows = `
      <tr>
        <td>0</td><td>${saldo.toFixed(2)}</td><td>–</td><td>–</td><td>–</td>
      </tr>
    `;

    for (let mes = 1; mes <= tiempo; mes++) {
      const interes = saldo * (mes >= mesTre ? (tasaMensualconTRE) : tasaMensual);
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
    let tiempo = plazo*12;
    let saldo = monto;
    const amortizacion = monto / tiempo;
    let totalInteres = 0;
    let totalPagado = 0;
    let rows = `
      <tr>
        <td>0</td><td>${saldo.toFixed(2)}</td><td>–</td><td>–</td><td>–</td>
      </tr>
    `;

    for (let mes = 1; mes <= tiempo; mes++) {
      const interes = saldo *  tasaMensual;
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
      <div class="sacSinTre-section">
        <h2>Método SAC sin TRE </h2>
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