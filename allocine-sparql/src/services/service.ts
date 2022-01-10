export class Service {

    private static instance : Service;

    private constructor() { }

    private static GetInstance() {
        if (!Service.instance) {
            Service.instance = new Service();
        }
        return Service.instance;
    }

    public getMovie (movieString: string) {
        // return fetch(`http://www.allocine.fr/recherche/?q=${movieString}`)
        //     .then(response => response.text())
        //     .then(response => {
        //         const parser = new DOMParser();
        //         const doc = parser.parseFromString(response, "text/html");
        //         const movie = doc.querySelector(".movie-list .movie");
        //         if (movie === null) return;
        //         const movieTitle = movie.querySelector(".title").textContent;
        //         const movieYear = movie.querySelector(".year").textContent;
        //         const moviePoster = movie.querySelector(".poster img").getAttribute("src");
        //         const movieSynopsis = movie.querySelector(".synopsis").textContent;
        //         const movieRuntime = movie.querySelector(".runtime").textContent;
        //         const movieGenre = movie.querySelector(".genre").textContent;
        //         const movieDirector = movie.querySelector(".director").textContent;
        //         const movieActors = movie.querySelector(".actors").textContent;
        //         const movieCountry = movie.querySelector(".country").textContent;
        //         const movieRating = movie.querySelector(".rating").textContent;
        //         const movieVotes = movie.querySelector(".votes").textContent;
        //         const movieUrl = movie.querySelector(".title a").getAttribute("href");
        //         const movieId = movieUrl.split("/")[4];
        //         return {
        //             title: movieTitle,
        //             year: movieYear,
        //             poster: moviePoster,
        //             synopsis: movieSynopsis,
        //             runtime: movieRuntime,
        //             genre: movieGenre,
        //             director: movieDirector,
        //             actors: movieActors,
        //             country: movieCountry,
        //             rating: movieRating,
        //             votes: movieVotes,
        //             url: movieUrl,
        //             id: movieId
        //         };
        //     });
    }

}