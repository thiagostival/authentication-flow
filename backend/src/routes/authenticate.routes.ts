import { Router } from "express";

import { AuthenticateUserController } from "../modules/users/controllers/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../modules/users/controllers/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh", refreshTokenController.handle);

export { authenticateRoutes };
