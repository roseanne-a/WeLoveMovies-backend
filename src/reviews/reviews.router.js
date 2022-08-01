const router = require("express").Router();
const cors = require("cors");

const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");

router.use(cors());

router
  .route("/:reviewId")
  .get(controller.read)
  .delete(controller.delete)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
