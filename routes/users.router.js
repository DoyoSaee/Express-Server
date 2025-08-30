const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:id", usersController.getUser);
// usersRouter.get("/:id", usersController.getUser2);
usersRouter.post("/", usersController.createUser);

module.exports = usersRouter;
