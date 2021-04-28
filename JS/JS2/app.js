const escolhas = {
    1: "Papel",
    2: "Pedra",
    3: "Tesoura"
}

rng = (inicio, fim) => Math.floor(Math.random() * fim) + inicio;

function decisao(jogada, jogada_pc) {
    if (jogada + 1 == jogada_pc || (jogada + 1 === 4 && jogada_pc === 1)) {
        ganhou();
    }

    else if (jogada === jogada_pc) {
        empatou();
    }

    else {
        perdeu();
    }


}

function ganhou() {
    console.log("Você ganhou!");
    pontos++;
}

function empatou() {
    console.log("A rodada empatou!");
}

function perdeu() {
    console.log("Você perdeu! A sua pontuação foi de " + pontos);
    flag = false;
}

function jogada_valida(jogada) {
    if (escolhas[jogada] == null) {
        console.log("Por favor escolha um número válido da próxima vez (pois essa aqui já era)!");
        flag = false;
        return false;
    }

    return true;
}

var flag = true;
var pontos = 0;


while (flag === true) {

    console.log("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura");

    let jogada = parseInt(window.prompt("Escolha o valor de sua jogada:"));

    if (jogada_valida(jogada) == true) {

        let jogada_pc = rng(1, 3);
        console.log(`O computador jogou ${escolhas[jogada_pc]}`);

        decisao(jogada, jogada_pc);
    }
}