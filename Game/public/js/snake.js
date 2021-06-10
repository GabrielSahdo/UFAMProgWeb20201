(function () {
  const TAM = 40;
  let FPS = 10;

  let start = false;

  let board;
  let snake;
  let fruit;

  let meuH3 = document.querySelector("#info-text");

  function init() {
    board = new Board();
    snake = new Snake();
    fruit = new Fruit();

    window.interval = window.setInterval(run, 1000 / FPS);
  }

  window.addEventListener("keydown", function (e) {
    e.preventDefault();

    if (e.key === "s" && snake.lost === true) {
      this.location.reload();
    } else if (e.key === "s" && start === false) {
      start = true;
      meuH3.innerHTML = "Pontos: <span id='pontos'></span>";

      let pontos = document.querySelector("#pontos");
      pontos.textContent = "00000";
    } else if (!snake.pause) {
      switch (e.key) {
        case "ArrowUp":
          if (snake.direcao !== 2) snake.mudarDirecao(0);
          break;
        case "ArrowRight":
          if (snake.direcao !== 3) snake.mudarDirecao(1);
          break;
        case "ArrowDown":
          if (snake.direcao !== 0) snake.mudarDirecao(2);
          break;
        case "ArrowLeft":
          if (snake.direcao !== 1) snake.mudarDirecao(3);
          break;
        case "p":
          pause();
          snake.pause = true;
          break;
      }
    } else if (e.key === "p") {
      unpause();
      snake.pause = false;
    }
  });

  function pause() {
    modal = document.querySelector("#myModal");
    modal.style.display = "block";
  }
  function unpause() {
    modal = document.querySelector("#myModal");
    modal.style.display = "none";
  }

  class Fruit {
    constructor() {
      this.counter = 0; //a cada 10 aumenta a velocidade
      this.eaten = 0;
      this.position = this.positionPicker();
      this.color = this.colorPicker();
      this.value = this.valuePicker();

      this.put();
    }

    //-------------------------- modifica valores de atributos ------------------------//

    positionPicker() {
      let x = Math.floor(Math.random() * TAM) + 1;
      let y = Math.floor(Math.random() * TAM) + 1;

      return [x, y];
    }

    colorPicker() {
      return Math.floor(Math.random() * 3) == 0 ? "red" : "black";
    }

    valuePicker() {
      return this.color == "black" ? 1 : 2;
    }

    //------------------------- modifica valores da tabela ---------------------------//

    put() {
      document.querySelector(
        `#board tr:nth-child(${this.position[0]}) td:nth-child(${this.position[1]})`
      ).style.backgroundColor = this.color;
    }

    take() {
      document.querySelector(
        `#board tr:nth-child(${this.position[0]}) td:nth-child(${this.position[1]})`
      ).style.backgroundColor = snake.color;
    }

    //------------------------- outros métodos --------------------------------//

    recalculate() {
      this.position = this.positionPicker();
      this.color = this.colorPicker();
      this.value = this.valuePicker();

      console.log(this);

      this.put();
    }

    eat() {
      this.take();

      this.counter += 1;

      if (snake.isOnSpree()) snake.speedUp();

      console.log(this.counter, FPS);

      this.eaten += this.value;
      pontos.textContent = this.pad(this.eaten, 5);

      this.recalculate();
    }

    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
  }

  class Board {
    constructor() {
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.cor = "#EEEEEE";
      for (let i = 0; i < TAM; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < TAM; j++) {
          let campo = document.createElement("td");
          row.appendChild(campo);
        }
        this.element.appendChild(row);
      }
      document.querySelector("#gameWrapper").append(this.element);
    }
  }

  class Snake {
    constructor() {
      this.lost = false;
      this.pause = false;

      this.corpoX = [4, 4, 4];
      this.corpoY = [5, 6, 7];

      this.cor = "#111111";
      this.direcao = 1; // 0:pracima; 1:pradireita; 2:prabaixo; 3:praesquerda

      for (let i = 0; i < this.corpoX.length; i++) {
        document.querySelector(
          `#board tr:nth-child(${this.corpoX[i]}) td:nth-child(${this.corpoY[i]})`
        ).style.backgroundColor = this.cor;
      }
    }

    andar() {
      if (this.pause) {
        return;
      }

      let head = [
        this.corpoX[this.corpoX.length - 1],
        this.corpoY[this.corpoY.length - 1],
      ];
      let add;

      switch (this.direcao) {
        case 0:
          add = [head[0] - 1, head[1]];
          break;
        case 1:
          add = [head[0], head[1] + 1];
          break;
        case 2:
          add = [head[0] + 1, head[1]];
          break;
        case 3:
          add = [head[0], head[1] - 1];
          break;
      }

      if (this.isOutOfBounds(add) || this.isOnSnakeBody(add))
        return (this.lost = true);

      this.corpoX.push(add[0]);
      this.corpoY.push(add[1]);

      document.querySelector(
        `#board tr:nth-child(${add[0]}) td:nth-child(${add[1]})`
      ).style.backgroundColor = this.cor;

      if (this.onFruit(head)) fruit.eat();
      else {
        let remX = this.corpoX.shift();
        let remY = this.corpoY.shift();
        document.querySelector(
          `#board tr:nth-child(${remX}) td:nth-child(${remY})`
        ).style.backgroundColor = board.cor;
      }
    }

    mudarDirecao(direcao) {
      this.direcao = direcao;
    }

    onFruit = (head) =>
      head[0] == fruit.position[0] && head[1] == fruit.position[1]
        ? true
        : false;

    isOnSpree = () => (fruit.counter > 10 ? true : false);

    speedUp = () => {
      FPS += 5;
      fruit.counter = 0;
    };

    isOutOfBounds = (add) =>
      add[0] > 40 || add[0] < 1 || add[1] > 40 || add[1] < 1 ? true : false;

    isOnSnakeBody(add) {
      for (let i = 0; i < this.corpoX.length; i++) {
        if (this.corpoX[i] == add[0] && this.corpoY[i] == add[1]) return true;
      }

      return false;
    }
  }

  function run() {
    if (start === false) return;

    snake.andar();
    if (snake.lost === true) end();
  }

  function end() {
    window.clearInterval(interval);

    modal = document.querySelector("#myModal");
    texto = document.querySelector("#texto");

    modal.style.display = "block";
    texto.textContent = "Game Over";
  }

  init();
})();
