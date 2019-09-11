const app = require("express")();
const path = require("path");
const opn = require("opn");
const port = process.env.PORT || 5000;

app.listen(port, err =>
  err
    ? process.exit(1)
    : console.log(`Server running!\nAddress: http://localhost:${port}/`)
);

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../web/index.html"))
);

opn(`http://localhost:${port}/`);
