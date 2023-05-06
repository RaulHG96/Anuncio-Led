document.addEventListener('DOMContentLoaded', () => {
    generaArregloCheck();

});

const generaArregloCheck = () => {
    const filas = 7;
    const columnas = 5;
    for (let fila = 0; fila < filas; fila++) {
        let divFila = $('<div>').addClass('columns-5');
        for (let columna = 0; columna < columnas; columna++) {
            divFila.append(
                $('<input>').attr({
                    'type': 'checkbox',
                    'id': `${fila}-${columna}`
                }).addClass('ml-1 check')
            );
        }
        $('#contenedor').append(divFila);
    }
}

document.getElementById('btn-genera').addEventListener('click', function(e) {
    const array = document.querySelectorAll('input[type="checkbox"].check');
    let arrayFinal = [
        [], [], [], [], [], [], [],
    ];
    // console.log(array.length);
    array.forEach(checkbox => {
        // console.log(checkbox.checked);
        // console.log(checkbox.getAttribute('id').split('-'));
        const tmp = checkbox.getAttribute('id').split('-');
        arrayFinal[parseInt(tmp[0])][parseInt(tmp[1])] = checkbox.checked ? 1 : 0;
    });
    console.log(arrayFinal);
});
