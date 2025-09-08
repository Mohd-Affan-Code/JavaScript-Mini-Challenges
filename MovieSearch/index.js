// https://www.omdbapi.com/?t=Avengers%3A+Endgame&y=2019&apikey=2996cb1c

// https://www.omdbapi.com/?s=endgame&page=1&apikey=2996cb1c

// let apiKey = "2996cb1c";

const input = document.querySelector("input");
const inputList = document.querySelector(".search-list");

async function showMovies(movieName) {
  let res = await fetch(
    `https://www.omdbapi.com/?s=${movieName}&page=1&apikey=2996cb1c`
  );
  let data = await res.json();
  if (data.Response == "True") displayMovieList(data.Search);
}

// search Movies in the input box

input.addEventListener("input", (e) => {
  if (input.value.length >= 2) {
    inputList.style.display = "block";
    console.log(e.target.value);
  }
});

// show movies list in input dropdown

function displayMovieList(moviesList) {
  inputList.innerHTML = "";
  moviesList.forEach((listItem) => {
    inputList.innerHTML += `<div class="single-movie">
            <img
              src="${listItem.Poster}"
              alt=""
            />
            <div class="movie-nameYear">
              <p>${listItem.Title}</p>
              <p>${listItem.Year}</p>
            </div>
      </div>`;
  });
}
