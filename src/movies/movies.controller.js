const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const movieExists = async (req, res, next) => {
  const { movieId } = req.params;

  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    return next({ status: 404, message: "Movie cannot be found." });
  }
};

async function list(req, res, next) {
  const { is_showing } = req.query;

  const movies = await service.list(is_showing);
  res.json({ data: movies });
}

function read(req, res, next) {
  const movie = res.locals.movie;

  res.json({ data: movie });
}

async function listTheatersShowingMovie(req, res, next) {
  const { movieId } = req.params;
  const theaterList = await service.listTheatersShowingMovie(movieId);

  res.json({ data: theaterList });
}

async function listReviewsandCritic(req, res, next) {
  const { movieId } = req.params;
  const reviewList = await service.listReviewsandCritic(movieId);

  res.json({ data: reviewList });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  listTheatersShowingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersShowingMovie),
  ],
  listReviewsandCritic: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviewsandCritic),
  ],
};
