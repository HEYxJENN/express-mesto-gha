const router = require("express").Router();
const {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);

router.post("/", createCard);

router.put("/", likeCard);

router.delete("/", deleteCard);

router.delete("/", dislikeCard);

module.exports = router;
