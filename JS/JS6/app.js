const alturas = document.querySelectorAll(".altura");
const largura = document.querySelector("#largura");

const btnDesenho = document.querySelector("#desenho");

const colunas = document.querySelectorAll(".coluna");

btnDesenho.addEventListener("click", () => {
    for (let i = 0; i < colunas.length; i++) {
        colunas[i].style.height = `${alturas[i].value}%`;
        colunas[i].style.width = `${largura.value}%`;

        console.log(colunas[i]);
    }
})