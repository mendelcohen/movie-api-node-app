const express = require("express");
require('dotenv').config();
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

const movieSearch = (req, res) => {
  let { searchName } = req.body;
  fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchName}&page=1&r=json`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(response => {
      let data = response;
      // console.log(response.Search);
      res.json(data);
    })
    .catch(err => {
      console.error(err);
    });
};

app.post("/movies", movieSearch);

const movieInfo = (req, res) => {
  let { id } = req.body;
  fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(response => {
      let data = response;
      console.log(response);
      res.json(data);
    })
    .catch(err => {
      console.error(err);
    });
};

app.post("/movie", movieInfo);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); 