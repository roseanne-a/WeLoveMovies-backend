const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const configuration = {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "theater_id"],
};

const movieProperties = reduceProperties("theater_id", configuration);

function list() {
  return knex("theaters as t")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at as t_created_at",
      "t.updated_at as t_updated_at",
      "m.*",
      "mt.is_showing"
    )
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")

    .then((list) => {
      return movieProperties(list);
    });
}

module.exports = { list };
