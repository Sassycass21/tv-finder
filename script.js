const showSelect = document.getElementById("show-select");
const message = document.getElementById("message");

async function getPopularShows() {
    message.textContent = "Loading popular shows...";
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular`,
            {
                headers: {
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                    accept: "application/json",
                }
            }
        );

        if (response.status === 401) {
            throw new Error(`Invalid API token.`);
        }

        if (!response.ok) {
            throw new Error(`Unable to load popular shows.`);
        }

        const data = await response.json();

        data.results.forEach(function (show) {
            const option = document.createElement("option");

            option.value = show.id;
            option.textContent = show.name;

            showSelect.appendChild(option);
        });

        message.textContent = "Popular shows loaded successfully!";

    } catch (error) {
        message.textContent = error.message;
        console.error(error);
    } 
}

async function getShowDetails(showId) {
    message.textContent = "Loading show details...";
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${showId}`,
            {
                headers: {
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                    accept: "application/json",
                }
            }
        );
        if (response.status === 401) {
            throw new Error(`Invalid API token.`);
        }

        if (!response.ok) {
            throw new Error(`Unable to load show details.`);
        }

        const data = await response.json();

        displayDetails(data);

    } catch (error) {
        message.textContent = error.message;
        console.error(error);
    } finally {
        message.textContent = "";
    }
}

function displayDetails(show) {
    const details = document.getElementById("show-details");

    details.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = show.name;
    details.appendChild(heading);

    if (show.poster_path) {
        const poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
        poster.alt = `${show.name} poster`;
        details.appendChild(poster);
    } else {
        const noPoster = document.createElement("p");
        noPoster.textContent = "No poster available";
        details.appendChild(noPoster);
    }

    const overview = document.createElement("p");
    overview.textContent = show.overview;
    details.appendChild(overview);

    const genres = document.createElement("p");
    genres.textContent = "Genres: " + show.genres.map(function (genre) {
        return genre.name;
    }).join(", ");
    details.appendChild(genres);

    const seasons = document.createElement("p");
    seasons.textContent = "Seasons: " + show.number_of_seasons;
    details.appendChild(seasons);

    const episodes = document.createElement("p");
    episodes.textContent = "Episodes: " + show.number_of_episodes;
    details.appendChild(episodes);

    const status = document.createElement("p");
    status.textContent = "Status: " + show.status;
    details.appendChild(status);
}

showSelect.addEventListener("change", function () {
    const showID = showSelect.value;
    if (showID) {
        getShowDetails(showID);
    }
});

getPopularShows();