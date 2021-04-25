
for (let i = 1; i <= 10; i++) {
    document.write("<table>");
    document.write("<tr>");
    document.write(`<th>Produtos de ${i}</th>`);
    document.write("</tr>");
    for (let j = 1; j <= 10; j++) {
        document.write("<tr>")
        document.write(`<td>${i}x${j}</td>`);
        document.write(`<td>${i * j}</td>`)
        document.write("</tr>");
    }
    document.write("</table>");
}
