module.exports.start = () => {
  const app = require("./express")();

  const port = 5000;

  app.listen(port, () => {
    console.log(`Running on the ${port}...`);
  });
};

/*
  1. default export
  2. normal export
  -----------------------------------------
  
  file1.js
  -----------
  const obj = {
    key1: value1,
    key2: value2
  }

  module.exports = obj;
  ----------------------------------------

  file1-v1.js
  -----------
  module.exports = {
    key1: value1,
    key2: value2
  }

  ----------------------------------------

  file1-v2.js
  -----------
  module.exports.key1 = value1;
  module.exports.key2 = value2;

  ----------------------------------------
  file2.js
  ----------
  const a = require('file1-v2.js');
*/
