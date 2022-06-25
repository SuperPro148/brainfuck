const fs = require("fs");
const readlineSync = require('readline-sync');
const script = fs.readFileSync(`${process.argv[2]}`, "utf8");
const data = [];
const code = [];
const loops = [];
const instructions = ["[","]","+","-",">","<",".",","];
for (let i = 0; i < 65536; i++) {
    data.push(0);
}

for (let i = 0, counter = 0; i < script.length; i++) {
    let char = script.charAt(i);
    if (instructions.includes(char)) {
        code.push(char);

        if (char == "[") {
            loops.unshift({start: counter, end: "open"});
        }
        if (char == "]") {
            for (let j = 0; j < loops.length; j++) {
                if (loops[j].end == "open") {
                    loops[j].end = counter;
                    break;
                }
            }
        }
        counter++;
    }
}

let pointer = 0;
for (let i = 0; i < code.length; i++) {
    let instr = code[i];
    switch(instr) {
        case ">": {
            if (pointer == 65535) {
                pointer = 0;
            } else {
                pointer++;
            }
            break;}
        case "<": {
            if (pointer == 0) {
                pointer = 65535;
            } else {
                pointer--;
            }
            break;}
        case "+": {
            if (data[pointer] == 255) {
                data[pointer] = 0;
            } else {
                data[pointer]++;
            }
            break;}
        case "-": {
            if (data[pointer] == 0) {
                data[pointer] = 255;
            } else {
                data[pointer]--;
            }
            break;}
        case "[": {
            let loop;
            for (let j = 0; j < loops.length; j++) {
                if (loops[j].start == i) {
                    loop = loops[j];
                    break;
                }
            }
            if (data[pointer] == 0) {
                i = loop.end;
            }
            break;}
        case "]": {
            let loop;
            for (let j = 0; j < loops.length; j++) {
                if (loops[j].end == i) {
                    loop = loops[j];
                    break;
                }
            }
            if (data[pointer] != 0) {
                i = loop.start;
            }
            break;}
        case ",": {
            let input;
            let inData = readlineSync.question("");
            input = "" + inData;
            data[pointer] = input.charCodeAt(0);
            process.stdin.destroy();
            break;}
        case ".": {
            let output = String.fromCharCode(data[pointer]);
            process.stdout.write(output);
            break;}
    }
}