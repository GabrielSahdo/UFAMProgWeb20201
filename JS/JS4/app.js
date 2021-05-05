class IntegerSet {
    constructor(maxNumber) {
        this.maxNumber = maxNumber;
        this.numbers = [];
        this.aux = []

        this.zerarArray();
    }

    zerarArray = () => {
        for (let i = 0; i <= this.maxNumber; i++) {
            this.aux.push(false);
        }
    }

    isValid = number => {
        return number <= this.maxNumber && number >= 0 ? true : false;
    }

    isIn = number => {
        return this.aux[number] === true ? true : false;
    }

    updateArray = number => {
        this.aux[number] = true;
    }

    insert = number => {
        if (this.isValid(number) && !this.isIn(number)) {
            this.numbers.push(number);
            this.updateArray(number);
        }
    }

    delete = number => {
        if (this.isIn(number)) {
            this.numbers.splice(this.numbers.indexOf(number), 1);
            this.aux[number] = false;
        }
    }

    union = obj => {

        let bigger = obj.maxNumber > this.maxNumber ? obj.maxNumber : this.maxNumber;

        var newObject = new IntegerSet(bigger);

        for (let i = 0; i < obj.numbers.length; i++) {
            newObject.insert(obj.numbers[i]);
        }

        for (let i = 0; i < this.numbers.length; i++) {
            newObject.insert(this.numbers[i]);
        }

        return newObject;
    }

    intersection = obj => {

        var array_intersection = [];

        for (let i = 0; i < this.aux.length; i++) {
            if (this.aux[i] === true && obj.aux[i] === this.aux[i]) {
                array_intersection.push(i);
            }

        }
        return array_intersection
    }

    diff = obj => {
        var array_diff = [];

        var smaller;
        var bigger;
        if (obj.maxNumber > this.maxNumber) {
            bigger = obj;
            smaller = this;
        } else {
            bigger = this;
            smaller = obj;
        }

        for (let i = 0; i < bigger.aux.length; i++) {
            if (bigger.aux[i] !== smaller.aux[i] && smaller.aux[i] !== undefined) {
                array_diff.push(i);
            }
        }

        return array_diff;
    }

    toString = () => {
        var result_string = "";

        result_string += `MaxNumber: ${this.maxNumber} \n`;
        result_string += `Numbers: [${this.numbers}] \n`;
        result_string += `HelperArray: [${this.aux}] \n`;

        console.log(result_string);
        return result_string;
    }

}

console.log("Dados do obj1:");

var obj1 = new IntegerSet(10);

obj1.insert(0);
obj1.insert(1);
obj1.insert(2);
obj1.insert(3);
obj1.insert(4);
obj1.insert(8);
obj1.insert(11); //tem que dar erro

console.log(`Obj1: ${obj1}`);

console.log(`numeros: ${obj1.numbers}`);
console.log(`vetor auxiliar: ${obj1.aux}`);

obj1.toString();


//----------------------------------------------------//

console.log("Dados do obj2:");

var obj2 = new IntegerSet(15);

obj2.insert(5);
obj2.insert(6);
obj2.insert(7);
obj2.insert(8); //intersection
obj2.insert(9);
obj2.insert(10);
obj2.insert(16); //não deve inserir

console.log(`numeros: ${obj2.numbers}`);
console.log(`vetor auxiliar: ${obj2.aux}`);

obj2.toString();


//-----------------------------------------------------//

console.log("Criando o obj3 da união de obj1 e obj2:");
var obj3 = obj1.union(obj2);

console.log(obj3.numbers);
console.log(obj3.aux);

//-----------------------------------------------------//

console.log(`interseção de 1 e 2: ${obj1.intersection(obj2)}`);
console.log(`diferença de 1 e 2: ${obj1.diff(obj2)}`);





//-----------------------------------------------------//