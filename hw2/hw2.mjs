import fs from 'fs'

// read instructions file
fs.readFile('instructions.txt', (err, data) => {
    if (err) {
        console.error('Unable to read instructions.txt or file doesn\'t exist.');
    } else {
        parseInstructions(data.toString());
    }
});

// parse instructions function
const parseInstructions = (instructions) => {
    const fileNames = instructions.split(' ');
    if (fileNames.length != 2) {
        console.error('File instructions.txt doesn\'t contain two file names.');
    } else {
        const inpName = fileNames[0];
        const outName = fileNames[1];

        fs.readFile(inpName, (err, data) => {
            if (err) {
                console.error('Unable to open input file named "' + inpName + '".');
            } else {
                createOutput(data.toString(), outName);
            }
        });
    }
}

// create output file function
const createOutput = (inpData, outFileName) => {
    fs.writeFile(outFileName, inpData, (err) => {
        if (err) {
            console.error('Unable to write data to output file named "' + outFileName + '".');
        } else {
            console.log('Output file "' + outFileName + '" successfully created and written into.');
        }
    });
}