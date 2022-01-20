const myhelp = require("./Commands/help.js");
const myorganise = require("./Commands/organise");
const mytree = require("./Commands/tree");
const inputArr = process.argv.slice(2);
let Command = inputArr[0];

switch (Command) {
  case "tree":
    mytree.Mtree(inputArr[1]);
    break;
  case "help":
    myhelp.Mhelp();
    // console.log("Help implemented");
    break;
  case "organise":
    myorganise.Morganiser(inputArr[1]);
    // console.log("Help implemented");
    break;
  default:
    console.log("please enter valid name");
    break;
}
