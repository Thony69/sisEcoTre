document.getElementById('calcularBtn').addEventListener('click', function() {
  const tbody = document.querySelector('#resultadoTabla tbody');
  tbody.innerHTML = ''; // limpiar tabla

  let valorInicial = 100; // ejemplo: TRE inicial 100 (ajusta)
  let tasaMensual = 0.01; // 1% mensual

  for (let mes = 1; mes <= 13; mes++) {
    valorInicial = valorInicial * (1 + tasaMensual);

    let fila = document.createElement('tr');

    let celdaMes = document.createElement('td');
    celdaMes.textContent = mes;
    fila.appendChild(celdaMes);

    let celdaValor = document.createElement('td');
    celdaValor.textContent = valorInicial.toFixed(2);
    fila.appendChild(celdaValor);

    tbody.appendChild(fila);
  }

  // Mostrar la tabla
  document.getElementById('resultadoTabla').style.display = 'table';
});
