const TEXT_INPUT = document.getElementById("textInputField");
const SEARCH_BTN = document.getElementById("searchBtn");
let MOVIE_INFO_CONTAINER = document.getElementById("movieInfoContainer");

console.log(TEXT_INPUT);
console.log(SEARCH_BTN);

SEARCH_BTN.addEventListener("click", getMovieInfo);

// create a function called getMovieInfo

async function getMovieInfo(e) {
  // this is to prevent the form from auto refreshing
  e.preventDefault();

  const movieTitle = TEXT_INPUT.value.trim();
  console.log(movieTitle);

  // show loading text while getting the movie Title
  MOVIE_INFO_CONTAINER.innerHTML = `<section class="flex justify-center items-center max-w-[600px] bg-white p-4 rounded-md gap-5">
  <div class="loader"></div>
  <h1 class="text-[2rem] font-bold bg-white p-2 rounded-md">Getting movie...</h1>
  </section>`;

  try {
    // make an http request to the movie api
    const data = await fetch(
      `https://www.omdbapi.com/?apikey=6aff0ce5&t=${movieTitle}`
    );
    console.log(data);
    const movieInfo = await data.json();

    // check if movie was not found
    if (movieInfo.Error) {
      MOVIE_INFO_CONTAINER.innerHTML = `<h1 class="text-[4rem] text-red-400 bg-white">${movieInfo.Error}</h1>`;
      return;
    }
    // show the actual movie ifo
    MOVIE_INFO_CONTAINER.innerHTML = `<section
          class="flex flex-col lg:flex-row gap-5 max-w-[600px] w-full justify-between bg-white p-4 rounded-lg"
        >
          <div>
            <h2 class="text-3xl font-bold tracking-wider">${movieInfo.Title}</h2>
            <p>
              <strong class="mr-2"><span>${movieInfo.Year}</span></strong>
            </p>
            <p>
              <strong class="mr-2">Release:</strong
              ><span class="text-gray-500">${movieInfo.Released}</span>
            </p>
            <p>
              <strong class="mr-2">Duration:</strong
              ><span class="text-gray-500">${movieInfo.Runtime}</span>
            </p>
            <p>
              <strong class="mr-2">Genre:</strong
              ><span class="text-gray-500">${movieInfo.Genre}</span>
            </p>
            <p>
              <strong class="mr-2">Director:</strong
              ><span class="text-gray-500">${movieInfo.Director}</span>
            </p>
            <p>
              <strong class="mr-2">Plot:</strong
              ><span class="text-gray-500">${movieInfo.Plot}</span>
            </p>
            <p>
              <strong class="mr-2">Awards:</strong
              ><span class="text-gray-500">${movieInfo.Awards}</span>
            </p>
          </div>
          <div>
            <img
              class="max-w-[600px] w-full rounded-md"
              src=${movieInfo.Poster}
              alt="movie poster"
            />
          </div>
        </section>`;

    // console.log(movieInfo);
    // console.log(movieInfo.Released):

    console.log(movieInfo);
  } catch (error) {
    console.log(error);
  }
}

// function getMovieInfo() {
