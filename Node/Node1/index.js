const http = require('http');
const fs = require('fs');

let dir = process.argv[2];

http.createServer((req, res) => {

    fs.readdir("./" + dir + "/", (error, files) => {
        
        error ? 
        res.write("Path invalido") : 
        files.forEach(file => res.write(file + '\n'))
    
        res.end();
    });
    

}).listen(3000);