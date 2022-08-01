const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function list(showing) {
  if (showing === "true") {
    return knex("movies as m")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .groupBy("m.movie_id");
  } else {
    return knex("movies as m").select("m.*");
  }
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheatersShowingMovie(movieId) {
  return knex("theaters as t")
    .select("t.*", "mt.*")
    .where({ "mt.movie_id": movieId })
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id");
}

function listReviewsandCritic(movieId) {
  return knex("reviews as r")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .join("critics as c", "c.critic_id", "r.critic_id")
    .then((list) => {
      return list.map((row) => {
        return addCritics(row);
      });
    });
}

module.exports = {
  list,
  read,
  listTheatersShowingMovie,
  listReviewsandCritic,
};
