const router = require("express").Router();
const user = require("../models/user");
const { getUser, createUser, getUsers } = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:userId", getUser);

router.post("/users", createUser);

module.exports = router;
