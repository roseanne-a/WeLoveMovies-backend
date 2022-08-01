const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const reviewExists = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  } else {
    return next({ status: 404, message: "Review cannot be found." });
  }
};

async function read(req, res, next) {
  res.json({ data: await service.read(res.locals.review.review_id) });
}

async function destroy(req, res, next) {
  const { reviewId } = req.params;

  await service.destroy(reviewId);

  res.sendStatus(204);
}

// async function update(req, res, next) {
//   const { reviewId } = req.params;
//   const updateContent = { ...req.body.data, review_id: reviewId };
//   const updatedReview = await service.update(updateContent);

//   res.json({ data: updatedReview });
// }

async function update(req, res) {
  const time = new Date().toISOString();
  const reviewId = res.locals.review.review_id;
  const updatedReview = {
    ...req.body.data,
    review_id: reviewId,
  };
  await service.update(updatedReview);
  const rawData = await service.updateCritic(reviewId);
  const data = { ...rawData[0], created_at: time, updated_at: time };
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
