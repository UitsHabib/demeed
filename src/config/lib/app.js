module.exports.start = () => {
  const app = require("./express")();
  const port = 3000;

  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
};
