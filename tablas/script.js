function addPlayer() {
    const table = document.getElementById('statsTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    // Añadir una celda para cada columna con un input
    row.insertCell(0).innerHTML = '<input type="text" placeholder="Nombre">';
    row.insertCell(1).innerHTML = '<input type="number" value="0" min="0">';
    row.insertCell(2).innerHTML = '<input type="number" value="0" min="0">';
    row.insertCell(3).innerHTML = '<input type="number" value="0" min="0">';
    row.insertCell(4).innerHTML = '<input type="number" value="0" min="0">';
    row.insertCell(5).innerHTML = '<input type="number" value="0" min="0">';
    row.insertCell(6).innerHTML = '<input type="number" value="0" min="0">';
    row.insertCell(7).innerHTML = '<input type="number" value="0" min="0">';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Obtener los datos de la tabla
    const table = document.getElementById("statsTable");
    const data = [];
  
    // Recorrer las filas de la tabla
    const rows = table.querySelectorAll("tr");
    rows.forEach((row, index) => {
        const rowData = [];
        const cells = row.querySelectorAll("td, th");
  
        cells.forEach(cell => {
            if (cell.querySelector("input")) {
                // Si la celda contiene un input, toma su valor
                rowData.push(cell.querySelector("input").value);
            } else {
                // Para las celdas de encabezado y de datos
                rowData.push(cell.innerText);
            }
        });
  
        // Añadir datos a la tabla
        // Evitar agregar la fila de encabezado en los datos
        if (index > 0) {
            data.push(rowData);
        }
    });
  
    // Configurar el PDF
    doc.text("Estadísticas de Baloncesto", 20, 10);
    doc.autoTable({
        head: [['Nombre', 'Puntos', 'Asistencias', 'Rebotes', 'Robos', 'Tapones', 'Faltas', 'Pérdidas']],
        body: data,
        styles: {
            cellPadding: 5, // Espaciado dentro de las celdas
            fontSize: 10, // Tamaño de la fuente
            overflow: 'linebreak', // Ajustar el texto en las celdas
        },
        headStyles: {
            fillColor: '#ff9800', // Color de fondo del encabezado
            textColor: '#ffffff', // Color del texto en el encabezado
            fontSize: 11, // Tamaño de fuente para encabezados
        },
        alternateRowStyles: {
            fillColor: '#ffe0b2', // Color de fondo de filas alternas
        },
        margin: { top: 20 }, // Margen superior
        startY: 20, // Posición vertical inicial
    });
  
    // Guardar el archivo PDF
    doc.save('estadisticas-baloncesto.pdf');
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration);
        }, function(err) {
            console.log('Error al registrar el Service Worker:', err);
        });
    });
}
