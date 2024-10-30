const fs = require("fs");

const write = (bikesArray) => {
  fs.writeFile("bikes.json", JSON.stringify(bikesArray, null, 2), (err) => {
    if (err) throw err;
    console.log("Archivo escrito correctamente");
  });
};

module.exports = { write };