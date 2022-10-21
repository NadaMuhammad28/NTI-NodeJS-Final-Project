const app = require("./src/src");
const { PORT } = process.env;

app.all("*", (req, res) => {
  res.status(500).send({ apiStatus: false, data: {}, message: "invalid url" });
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
