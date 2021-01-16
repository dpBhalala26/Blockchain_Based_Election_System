const express = require("express");
const path = require("path");
const port = process.env.port || 4200;
const app = express();

const disDir = path.join(__dirname, "../dist/SecurElect");
app.use(express.static(disDir));

app.get("/", (req, res) => res.sendFile(path.join(disDir, "index.html")));

app.listen(port, () => console.log(`server running at ${port}`));
