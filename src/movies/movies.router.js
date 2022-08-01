const router = require("express").Router();
const cors = require("cors");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use(cors());

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router
  .route("/:movieId/theaters")
  .get(controller.listTheatersShowingMovie)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsandCritic)
  .all(methodNotAllowed);

module.exports = router;
