import http from 'http'
import path from 'path'
import fs from 'fs'

const port = 3000;
const counterFileName = 'counter.txt';

const server = http.createServer((req, res) => {
    console.log('incoming req ', req.url);
    const uri = req.url.slice(1) || 'index.html';

    try {
        if (uri == 'read') {
            readCounter(req, res);
        } else {

        }
    } catch (err) {
        res.statusCode = 404;
        res.write(err.message);
    } finally {
        res.end();
    }
});

server.listen(port, () => {
    console.log(`Server is listening @localhost:${port}`);
});

function createCounter() {
    fs.writeFile(counterFileName, '0', (err) => {
        if (err) {
            reject(`Unable to create file "${counterFileName}".`);
        } else {
            resolve(`Output file "${counterFileName}" successfully created.`);
        }
    });
}

 function readCounter(req, res) {
    console.log('Reading');
    fs.readFile(counterFileName, 'utf8', (err, data) => {

        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`File "${counterFileName}" does not exist. Creating it now...`);
                fs.writeFile(counterFileName, '0', (err) => {
                    if (err) {
                        console.error(`Error while creating file "${counterFileName}".`);
                        res.statusCode = 403;
                        res.end(err.message);
                    }
                    console.log('Writing');
                });
            }

            res.statusCode = 404;
            res.write(err.message);
        } else {
            res.statusCode = 200;
            res.end(data);
        }
    });
}