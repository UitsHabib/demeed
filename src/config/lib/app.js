module.exports.start = () => {
	require("dotenv").config();
	const app = require("./express")();
	const { PORT } = process.env;

	app.listen(PORT, () => {
		console.log(`Running on the ${PORT}...`);
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
