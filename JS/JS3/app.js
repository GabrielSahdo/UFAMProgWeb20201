function counter(number) {

    return () => {
        number++;
        return number;
    }
}

let incrementar = counter(1);

console.log("Primeira chamada " + incrementar());
console.log("Segunda chamada " + incrementar());
console.log("Terceira chamada " + incrementar());