function calcularTRE() {
    const montoInput = document.getElementById('monto');
    const plazoInput = document.getElementById('plazo');
    const tasaInput = document.getElementById('tasa');
    const treInput = document.getElementById('tre');
    const mesTreInput = document.getElementById('mesTre');

    const monto = parseFloat(montoInput.value);
    const plazo = parseInt(plazoInput.value);
    const tasaAnual = parseFloat(tasaInput.value) / 100;
    const treAnual = parseFloat(treInput.value) / 100;
    const mesTre = parseInt(mesTreInput.value);
    
    const result = document.getElementById('resultado');

    if (isNaN(monto) || montoInput.value.trim() === '' ||
        isNaN(plazo) || plazoInput.value.trim() === '' ||
        isNaN(tasaAnual) || tasaInput.value.trim() === '' ||
        isNaN(treAnual) || treInput.value.trim() === '' ||
        isNaN(mesTre) || mesTreInput.value.trim() === '') {
        
        result.innerHTML = '<p style="color: red; font-weight: bold;">Por favor, complete todos los campos.</p>';
        return;
    }

    if (monto < 0 || plazo < 0 || tasaAnual < 0 || treAnual < 0 || mesTre < 0) {
        result.innerHTML = '<p style="color: red; font-weight: bold;">Por favor, ingrese solo números positivos.</p>';
        return;
    }

    const tasaMensual = tasaAnual / 12;
    const treMensual = treAnual / 12;

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
    
    function generarTablaSAC() {
        let tiempo = plazo * 12;
        let saldo = monto;
        const amortizacion = monto / tiempo;
        let totalInteres = 0;
        let totalPagado = 0;
        const tasaAjustadaAnual = (tasaAnual - 0.02) + treAnual; 
        const tasaMensualconTRE = tasaAjustadaAnual / 12; 
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
                <h2>Método SAC con TRE</h2>
                <div class="table-responsive">
                <table>
                    <tr><th>Mes</th><th>Saldo</th><th>Amortización</th><th>Interés</th><th>Cuota</th></tr>
                    ${rows}
                </table>
                </div>
                <div class="summary">
                    <p>Total intereses: $${totalInteres.toFixed(2)}</p>
                    <p>Total pagado: $${totalPagado.toFixed(2)}</p>
                </div>
            </div>
        `;
    }

    function generarTablaSACsinTRE() {
        let tiempo = plazo * 12;
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
            const interes = saldo * tasaMensual;
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
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('keydown', function(e) {
    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === ',') {
      e.preventDefault();
    }
  });
});