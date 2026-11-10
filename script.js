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
        if (!response.ok) {
            throw new Error(`Unable to load show details.`);
        }

        const data = await response.json();

        console.log(data);
        message.textContent = "Show details loaded successfully!";
    } catch (error) {
        message.textContent = error.message;
        console.error(error);
    }
}

showSelect.addEventListener("change", function () {
    const showID = showSelect.value;
    if (showID) {
        getShowDetails(showID);
    }
});

getPopularShows();