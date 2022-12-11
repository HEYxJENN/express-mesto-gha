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

router.put("/", likeCard);

router.delete("/", deleteCard);

router.delete("/", dislikeCard);

module.exports = router;
