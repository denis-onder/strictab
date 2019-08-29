const app = require("express")();
const path = require("path");
const config = require("./config");
const opn = require("opn");
const mongoose = require("mongoose");

app.listen(config.port, err =>
  err
    ? process.exit(1)
    : console.log(
        `Server running!\nAddress: http://localhost:${config.port}/\nEnvironment: ${config.environment}`
      )
);

mongoose.connect(
  `mongodb://localhost:${config.database.port}/${config.database.name}`,
  { useNewUrlParser: true },
  err => (err ? console.error(err) : console.log("Database connected!"))
);

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../web/index.html"))
);

opn(`http://localhost:${config.port}/`);
