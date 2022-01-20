const fs = require("fs");
const path = require("path");
let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};
function organise(dirpath) {
  let destinationPath;
  if (dirpath == undefined) {
    console.log("please enter vailed path");
    return;
  } else {
    let isexist = fs.existsSync(dirpath);
    if (isexist == true) {
      destinationPath = path.join(dirpath, "organise");
      if (fs.existsSync(destinationPath) == false) {
        fs.mkdirSync(destinationPath);
      } else {
        console.log("organise file  is already esists");
      }
    } else {
      console.log("please enter vailed path");
      return;
    }
  }
  // console.log(destinationPath);
  organiseHelper(dirpath, destinationPath);
}

function organiseHelper(src, des) {
  // console.log("ayi");
  let allName = fs.readdirSync(src);
  for (let i = 0; i < allName.length; i++) {
    let onepath = path.join(src, allName[i]);
    let isfile = fs.lstatSync(onepath).isFile();
    if (isfile) {
      let filecategory = getCategory(allName[i]);
      // console.log(filecategory + " belong to " + allName[i]);
      sendfile(onepath, des, filecategory);
    }
    // console.log(onepath);
  }
}
function getCategory(fileName) {
  let exe = path.extname(fileName).slice(1);
  for (let type in types) {
    let cTypeArr = types[type];
    for (let i = 0; i < cTypeArr.length; i++) {
      if (exe == cTypeArr[i]) {
        return type;
        // console.log(type, exe);
      }
    }
  }
  return "other";
}
function sendfile(src, des, filecategory) {
  // console.log(des); //C:\Users\Prince\OneDrive\Desktop\File System Organiser\Test\organise
  let fullyPathDir = path.join(des, filecategory);
  if (fs.existsSync(fullyPathDir) == false) {
    fs.mkdirSync(fullyPathDir);
  }
  let file_distinationpath = path.join(fullyPathDir, path.basename(src)); //C:\Users\Prince\OneDrive\Desktop\File System Organiser\Test\organise\documents\one.txt
  fs.copyFileSync(src, file_distinationpath);
  fs.unlinkSync(src);
}
module.exports = {
  Morganiser: organise,
};
