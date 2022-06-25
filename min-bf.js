const fs = require("fs");
const script = fs.readFileSync(`${process.argv[2]}`, "utf8");
const code = [];
const instructions = ["[","]","+","-",">","<",".",","];
const initdir = process.argv[2].split("\\");
const outputname = "min-" + initdir.splice(initdir.length - 1);
for (let i = 0, counter = 0; i < script.length; i++) {
    let char = script.charAt(i);
    if (instructions.includes(char)) {
        code.push(char);
    }
}
fs.writeFileSync(`${initdir.join("\\") + "\\" + outputname}`, code.join(""));