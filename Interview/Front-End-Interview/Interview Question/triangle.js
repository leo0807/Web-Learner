const rowLength = 10;
document.write('<table>');
for (let row = 1; row < rowLength; row++) {
    document.write('</tr>');
    for (let col = 1; col <= row; col++) {
        document.write(`<td>${row} * ${col} = ${row * col}</td>`);
    }
    document.write('</tr>');
}
document.write('</table>');