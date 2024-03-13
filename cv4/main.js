/* diky "type": "module" v package.json muzu pouzit import misto require, jako kdybybych mel .mjs soubor*/
/* "scripts" dovoli pres NPM pustit testy nebo jakykoliv skrypt, i spusteni programu pres: npm run nazev_skryptu */
/* npmjs.com databaze balicku, nainstaluji a pak muzu importovat */

import chalk from 'chalk'
import http from 'http'
import path from 'path'
import fs from 'fs/promises'

const port = 3000;

const server = http.createServer(async (req, res) => {
    console.log('incoming req ', req.url);
    //console.log('method', req.method);
    //console.log('headers', req.headers);

    const uri = req.url.slice(1) || 'index.html';
    const file = path.join('public', uri);

    try {
        const html = await fs.readFile('./index.html');
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.write(html);
    } catch (err) {
        res.statusCode = 404;
        res.write(err.message);
    } finally {
        res.end();
    }
});

server.listen(port, () => {
    console.log(chalk.bgGreen(`Hello there, server is listening @localhost:${port}`));
});