// https://www.omdbapi.com/?t=Avengers%3A+Endgame&y=2019&apikey=2996cb1c

// https://www.omdbapi.com/?s=endgame&page=1&apikey=2996cb1c

// let apiKey = "2996cb1c";

const input = document.querySelector("input");
const inputList = document.querySelector(".search-list");
const detailContainer = document.querySelector(".detail-container");

async function showMovies(movieName) {
  let res = await fetch(
    `https://www.omdbapi.com/?s=${movieName}&page=1&apikey=2996cb1c`
  );
  let data = await res.json();
  if (data.Response == "True") displayMovieList(data.Search);
}

// search Movies in the input box

let debounceTimer;
input.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  if (input.value.trim().length >= 2) {
    debounceTimer = setTimeout(() => {
      inputList.style.display = "block";
      showMovies(e.target.value.trim());
    }, 500);
  }
});

// show movies list in input dropdown

function displayMovieList(moviesList) {
  inputList.innerHTML = "";
  console.log(moviesList);
  moviesList.forEach((listItem) => {
    let poster = listItem.Poster !== "N/A" ? listItem.Poster : "default.jpg";
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("single-movie");

    movieDiv.innerHTML = `
      <img src="${poster}" alt="" />
      <div class="movie-nameYear">
        <p>${listItem.Title}</p>
        <p>${listItem.Year}</p>
      </div>
    `;
    movieDiv.addEventListener("click", () => {
      showMoviesDetails(listItem.Title, listItem.Year);
      inputList.style.display = "none";
    });
    inputList.appendChild(movieDiv);
  });
}

async function showMoviesDetails(movieName, year) {
  let res = await fetch(
    `https://www.omdbapi.com/?t=${movieName}&y=${year}&apikey=2996cb1c`
  );
  let movieData = await res.json();
  console.log(movieData);
  detailContainer.innerHTML = "";
  let firstEl = document.createElement("div");
  let secondEl = document.createElement("div");

  firstEl.classList.add("right");
  secondEl.classList.add("left");

  firstEl.innerHTML = `
  <div class="poster">
            <img
              src="${movieData.Poster}"
              alt="movie Poster"
            />
            <p class="runtime"><b>Runtime:</b> ${movieData.Runtime}</p>
          </div>
  `;
  secondEl.innerHTML = `
  <div class="movie-name">
            <p>${movieData.Title}</p>
          </div>
          <div class="movie-dates">
            <p class="year"><b> Year:</b> ${movieData.Year}</p>
            <p class="rating"><b> Rating:</b> ${movieData.Rated}</p>
            <p class="released"><b> Released:</b> ${movieData.Released}</p>
          </div>
          <p class="genre"><b>Genre:</b> ${movieData.Genre}</p>
          <p class="writer">
            <b>Writer:</b> ${movieData.Writer}
          </p>
          <p class="actors">
            <b>Actors:</b> ${movieData.Actors}
          </p>
          <p class="plot">
            <b>Plot:</b> ${movieData.Plot}
          </p>
          <p class="language"><b>Language:</b> ${movieData.Language}</p>
  `;
  detailContainer.append(firstEl, secondEl);
}
