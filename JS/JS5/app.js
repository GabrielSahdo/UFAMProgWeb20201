const area = document.querySelector("#area");
const circunferencia = document.querySelector("#circunferencia");
const raio = document.querySelector("#raio");

const btnCalcular = document.querySelector("#btn-calcular");

btnCalcular.addEventListener("click", () => {

    area.value = Math.PI * Math.pow(raio.value, 2);
    circunferencia.value = 2 * Math.PI * raio.value;

});