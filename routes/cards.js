const router = require("express").Router();
const {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);

router.post("/cards", createCard);

router.put("/cards/:id/likes", likeCard);

router.delete("/cards/:id", deleteCard);

router.delete("/cards/:id/likes", dislikeCard);

module.exports = router;
