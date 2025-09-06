// https://www.omdbapi.com/?t=Avengers%3A+Endgame&y=2019&apikey=2996cb1c

// https://www.omdbapi.com/?s=endgame&page=1&apikey=2996cb1c

let apiKey = "2996cb1c";
let fetchedData = "";
function getMovieData() {
  fetch("https://www.omdbapi.com/?s=endgame&plot=full&apikey=2996cb1c")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchedData = data;
    });
}

getMovieData();
