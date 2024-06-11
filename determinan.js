function calculateDeterminant() {
    var matrixInput = document.getElementById('matrixInput').value;
    var matrixRows = matrixInput.trim().split('\n');
    var matrix = matrixRows.map(row => row.trim().split(/\s+/).map(Number));
    
    var determinant = findDeterminant(matrix);
    var explanation = explainDeterminant(matrix);

    displayResult(determinant, explanation);
}

function findDeterminant(matrix) {
    var order = matrix.length;
    if (order === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else if (order === 3) {
        return (
            matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
            matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
            matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
        );
    } else {
        var determinant = 0;
        for (var j = 0; j < order; j++) {
            determinant += matrix[0][j] * cofactor(matrix, 0, j);
        }
        return determinant;
    }
}

function cofactor(matrix, row, col) {
    var minorMatrix = [];
    for (var i = 0; i < matrix.length; i++) {
        if (i !== row) {
            var minorRow = [];
            for (var j = 0; j < matrix[i].length; j++) {
                if (j !== col) {
                    minorRow.push(matrix[i][j]);
                }
            }
            minorMatrix.push(minorRow);
        }
    }
    var sign = (row + col) % 2 === 0 ? 1 : -1;
    return sign * findDeterminant(minorMatrix);
}

function explainDeterminant(matrix) {
    var order = matrix.length;
    if (order === 2) {
        var a = matrix[0][0], b = matrix[0][1];
        var c = matrix[1][0], d = matrix[1][1];

        var explanation = `Langkah-langkah perhitungan determinan:\n`;
        explanation += `Determinan = ad - bc\n`;
        explanation += `= (${a} * ${d}) - (${b} * ${c})\n`;
        explanation += `= ${a * d} - ${b * c}\n`;
        explanation += `= ${a * d - b * c}`;
        return explanation;
    } else if (order === 3) {
        var a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
        var d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
        var g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];

        var explanation = `Langkah-langkah perhitungan determinan:\n`;
        explanation += `Determinan = aei + bfg + cdh - ceg - bdi - afh\n`;
        explanation += `= (${a} * ${e} * ${i}) + (${b} * ${f} * ${g}) + (${c} * ${d} * ${h}) - `;
        explanation += `(${c} * ${e} * ${g}) - (${b} * ${d} * ${i}) - (${a} * ${f} * ${h})\n`;
        explanation += `= ${a * e * i} + ${b * f * g} + ${c * d * h} - ${c * e * g} - ${b * d * i} - ${a * f * h}\n`;
        explanation += `= ${a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h}`;
        return explanation;
    } else if (order === 4) {
        var explanation = `Langkah-langkah perhitungan determinan:\n`;
        explanation += `Determinan dihitung menggunakan ekspansi kofaktor sebagai berikut:\n`;
        
        for (var j = 0; j < order; j++) {
            explanation += `+ (${matrix[0][j]}) * C(${0},${j})\n`;
        }
        explanation += `di mana C(i,j) adalah kofaktor elemen pada baris i dan kolom j.\n`;
        explanation += `Kofaktor dihitung dengan mengeluarkan baris dan kolom dari elemen tersebut dan mengambil determinan dari matriks minor yang dihasilkan.\n`;

        var determinant = 0;
        for (var j = 0; j < order; j++) {
            var cof = cofactor(matrix, 0, j);
            explanation += `Kofaktor C(${0},${j}) = ${cof}\n`;
            determinant += matrix[0][j] * cof;
        }
        explanation += `Total determinan: ${determinant}\n`;

        return explanation;
    } else {
        return 'Penjelasan perhitungan determinan untuk ordo ' + order + 'x' + order + ' belum tersedia.';
    }
}

function displayResult(determinant, explanation) {
    var resultContainer = document.getElementById('result');
    var explanationContainer = document.getElementById('explanation');
    resultContainer.innerHTML = '<h3>Determinant:</h3>' + determinant;
    explanationContainer.innerHTML = '<h3>Explanation:</h3><pre>' + explanation + '</pre>';
}
