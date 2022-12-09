const router = require("express").Router();

// GET /users — возвращает всех пользователей
module.exports.getUsers = router.get("/users", (req, res) => {
  users
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

// GET /users/:userId - возвращает пользователя по _id

module.exports.getUser = router.get("/users/:userId", (req, res) => {
  users
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

// POST /users — создаёт пользователя

module.exports.createUser = router.post("/users", (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

//апдейтЮзер

//апдейтАватар
