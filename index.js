const express = require("express");
const axios = require("axios");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/getPopulation/:year/:itemsCount", async (req, res) => {
  const { year, itemsCount } = req.params;
  const url = `https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=${year}&per_page=${itemsCount}`;
  const response = await axios.get(url);
  res.set("Content-Type", "text/xml");
  res.send(response.data);
});

app.get("/getGdp/:year/:itemsCount", async (req, res) => {
  const { year, itemsCount } = req.params;
  const url = `https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?date=${year}&per_page=${itemsCount}`;
  const response = await axios.get(url);
  res.set("Content-Type", "text/xml");
  res.send(response.data);
});

app.get("/fetchShortWikiInfo/:itemName", async (req, res) => {
  const { itemName } = req.params;
  const url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${itemName}`;
  const response = await axios.get(url);
  res.set("Content-Type", "text/xml");
  res.send(response.data);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
