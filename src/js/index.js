const filas = 7;
const columnas = 12;
const filasFinal = 7;
const columnasFinal = 45;
document.addEventListener('DOMContentLoaded', () => {
    generaTableroFinal();
    setInterval(mueveLuces, 200);
});

const generaLuces = () => {
    let palabra = String('que onda chaval');
    let nuevoArreglo = [
        [], [], [], [], [], [], []
    ];
    let contadorColumna = 0;
    for (let index = 0; index < palabra.length; index++) {
        console.log(palabra[index]);
        let letra;
        if(palabra[index] === ' ') {
            letra = [...abecedario['espacio_palabras']];
        } else {
            letra = [...abecedario[palabra[index]]];
        }
        // Se agrega letra/espacio palabras a nuevo arreglo
        for (let columna = 0; columna < letra[0].length; columna++) {
            // console.log(contadorColumna);
            for (let fila = 0; fila < 7; fila++) {
                nuevoArreglo[fila][contadorColumna] = letra[fila][columna];
            }
            contadorColumna++;
        }
        // Se agrega espacio entre letras si no es espacio de palabras
        if(palabra[index] !== ' ') {
            letra = [...abecedario['espacio_letras']];
            for (let columna = 0; columna < letra[0].length; columna++) {
                // console.log(contadorColumna);
                for (let fila = 0; fila < 7; fila++) {
                    nuevoArreglo[fila][contadorColumna] = letra[fila][columna];
                }
                contadorColumna++;
            }
        }
    }
    // console.log(nuevoArreglo);
    return nuevoArreglo;
}

const generaTablero = () => {
    for (let fila = 0; fila < filasFinal; fila++) {
        for (let columna = 0; columna < columnasFinal; columna++) {
            $('div#contenido-anuncio').append(
                $('<div></div>')
                    .html(`${fila}-${columna}`)
                    .addClass(`border-2`)
                    .attr('id', `${fila}-${columna}`)
            );
        }
    }
}

const generaTableroFinal = () => {
    const XS_COLUMNS = 20;
    const SM_COLUMNS = 30;
    const MD_COLUMNS = 40;
    const LG_COLUMNS = 45;
    const CLASS_XS_COLUMNS = `columns-[20]`;
    const CLASS_SM_COLUMNS = `sm:columns-[30]`;
    const CLASS_MD_COLUMNS = `md:columns-[40]`;
    const CLASS_LG_COLUMNS = `lg:columns-[45]`;
    for (let fila = 0; fila < filasFinal; fila++) {
        let filaTablero = $('<div></div>').addClass(
            `border border-black bg-black bg-cover bg-repeat-y ${CLASS_XS_COLUMNS} ${CLASS_SM_COLUMNS} ${CLASS_MD_COLUMNS} ${CLASS_LG_COLUMNS} opacity-95 gap-0`
        );
        for (let columna = 0; columna < columnasFinal; columna++) {
            let sizeClass = '';
            if(columna >= 0 && columna < XS_COLUMNS) {
                sizeClass = 'block';
            } else if(columna >= XS_COLUMNS && columna < SM_COLUMNS) {
                sizeClass = 'hidden sm:block';
            } else if(columna >= SM_COLUMNS && columna < MD_COLUMNS) {
                sizeClass = 'hidden md:block';
            } else if(columna >= MD_COLUMNS && columna < LG_COLUMNS) {
                sizeClass = 'hidden lg:block';
            }
            filaTablero.append(
                $('<div></div>').addClass(
                    `mx-auto rounded-full w-4 h-4 bg-lime-500 opacity-[0.3] ${sizeClass}`
                ).attr('id', `${fila}-${columna}`)
            );
        }
        $('div#final').append(
            filaTablero
        );
    }
}

const enciendeLuces = (tablero) => {
    const apagado = 'mx-auto rounded-full w-4 h-4 bg-gray-500 opacity-[0.3]';
    const encendido = 'mx-auto rounded-full w-4 h-4 shadow-lime-300 bg-lime-400 blur-[1px] shadow-sm';
    for (let fila = 0; fila < filasFinal; fila++) {
        for (let columna = 0; columna < columnasFinal; columna++) {
            $(`#${fila}-${columna}`).removeClass(apagado);
            $(`#${fila}-${columna}`).removeClass(encendido);
            $(`#${fila}-${columna}`).addClass(`${tablero[fila][columna] == 1 ? encendido : apagado}`);
        }
    }
}

let tableroCopia = generaLuces();
let tableroTMP = [
    [], [], [], [], [], [], []
];
let contadorTMP = 0;
const mueveLuces = () => {
    // Mueve a última columna la columns de registro original
    for(let fila = 0; fila < filas; fila++) {
        tableroTMP[fila][columnasFinal] = tableroCopia[fila][contadorTMP];
    }
    
    for (let columna = 0; columna < columnasFinal; columna++) {
        for (let fila = 0; fila < filasFinal; fila++) {
            tableroTMP[fila][columna] = tableroTMP[fila][columna+1];
        }
    }
    contadorTMP++;
    // console.table(tableroTMP);
    enciendeLuces(tableroTMP);
}