import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/controllers/createUser/CreateUserController";
import { GetUserController } from "../modules/users/controllers/getUser/GetUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", ensureAuthenticated, getUserController.handle);

export { usersRoutes };
