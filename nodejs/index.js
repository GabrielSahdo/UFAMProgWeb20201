const fs = require('fs');
const http = require('http');

const server = http.createServer(function (req, res) {
    var dirname = ''

    fs.readdir(dirname, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                res.write(file);
            });
        }
    })

    res.end();
    
});

server.listen(8000);