import http from 'http';
import fs from 'fs';
import chalk from 'chalk';

const PORT = 3000;
const COUNTER_FILE_NAME = 'counter.txt';

const server = http.createServer((req, res) => {
  // retrieve requested path
  const uri = req.url.slice(1);
  // decide what to do
  if (uri == 'read') {
    handleCounter(res);
  } else if (uri == 'increase') {
    handleCounter(res, 1);
  } else if (uri == 'decrease') {
    handleCounter(res, -1);
  } else {
    // all other requests show homepage
    fs.readFile('index.html', (err, data) => {
      if (err) {
        serverResponse(
          res,
          404,
          '<p style="color:red">Sorry, this page was not found.</p>'
        );
      } else {
        serverResponse(res, 200, data);
      }
    });
  }
});

// start HTTP server
server.listen(PORT, () => {
  console.log(chalk.bgGreen(`Server is listening @localhost:${PORT}`));
});

/**
 * Function to create server response.
 * @param {http.ServerResponse<http.IncomingMessage>} res - response object for http server
 * @param {number} code - HTTP response code
 * @param {string} data - string with data to show as HTML
 */
const serverResponse = (res, code, data) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = code;
  res.write(data);
  res.end();
};

/**
 * Function to handle counter actions.
 * @param {http.ServerResponse<http.IncomingMessage>} res - response object for http server
 * @param {number} increment - 0 as default, 1 for increase, -1 for decrease
 */
const handleCounter = (res, increment = 0) => {
  fs.readFile(COUNTER_FILE_NAME, 'utf8', (err, data) => {
    if (err || data.length === 0) {
      // create file or put data in it if it is empty
      fs.writeFile(COUNTER_FILE_NAME, '0', (err) => {
        if (err) {
          console.error(
            chalk.bgRed(`Error while writing file "${COUNTER_FILE_NAME}".`)
          );
        }
      });
      serverResponse(
        res,
        500,
        `<p style="color:red">Counter error, try refreshing the page.</p>`
      );
    } else {
      // parse number
      var counter = parseInt(data);
      // change counter if neccessary
      if (increment != 0) {
        counter = counter + increment;
        fs.writeFile(COUNTER_FILE_NAME, counter.toString(), (err) => {
          if (err) {
            console.error(
              chalk.bgRed(`Error while writing file "${COUNTER_FILE_NAME}".`)
            );
          }
        });
      }
      // send server response
      serverResponse(
        res,
        200,
        `<a href="http://localhost:3000/">How to use this?</a>
        <br><h1>Counter currently at: ${counter.toString()}</h1>`
      );
    }
  });
};
