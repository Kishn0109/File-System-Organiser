const fs = require("fs");
const path = require("path");
function treefn(dirpath) {
  if (dirpath == undefined) {
    System.out.println("please enter path");
    return;
  } else {
    if (!fs.existsSync(dirpath)) {
      System.out.println("please enter vailed path");
      return;
    } else {
      treehelper(dirpath, " ");
    }
  }
}

function treehelper(mpath, indent) {
  let isfile = fs.lstatSync(mpath).isFile();
  let baseName = path.basename(mpath);
  // console.log(baseName);
  if (isfile) {
    // baseName = path.basename(isfile);
    console.log("|-", baseName);
  } else {
    console.log("->", baseName);
    let childs = fs.readdirSync(mpath);
    for (let i = 0; i < childs.length; i++) {
      let childpath = path.join(mpath, childs[i]);
      treehelper(childpath, indent + "\t\t");
    }
  }
}

module.exports = {
  Mtree: treefn,
};
