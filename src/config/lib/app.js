module.exports.start = () => {
  const app = require("./express")();
  const port = 5000;

  app.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
};
