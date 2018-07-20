const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

const publicPath = path.join(__dirname, "../public");

//use express npm to use the index.html file stored in publicPath var to then
//run the app on PORT 3000 from the terminal and run fron chrome using localhost:3000
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started on Port ${port}`);
});
