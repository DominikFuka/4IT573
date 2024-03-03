import fs from 'fs'

const readInstructions = (path, timeout = 1000) => new Promise((resolve, reject) => {
    const currentTimeout = setTimeout(() => {
        reject('Operation read instruction from file timed out.');
    }, timeout);

    fs.readFile(path, (err, data) => {
        clearTimeout(currentTimeout);
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    })
})

try {
    const data = await readInstructions('instructions.txt', 10);
    if (isNumeric(data)) {
        const createFilePromises = [];

        for (let i = 0; i <= parseInt(data); i++) {
            createFilePromises.push(createFileAsync(i));
        }

        Promise.all(createFilePromises)
            .then((results) => {
                console.log('All promises done: ', results);
            })
            .catch((err) => {
                console.log(err)
            });
    }
} catch (err) {
    console.error(err);
}

function createFileAsync(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fileName = number + '.txt';
            const fileData = 'File #' + number.toString();
            fs.writeFile(fileName, fileData, (err) => {
                if (err) {
                    reject('Unable to create file named "' + fileName + '".');
                } else {
                    resolve('Output file "' + fileName + '" successfully created.');
                }
            });
        }, 100);
    });
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}