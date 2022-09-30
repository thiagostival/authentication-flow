import { container } from "tsyringe";

import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { UsersTokenRepository } from "../../modules/users/repositories/implementations/UsersTokenRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../modules/users/repositories/IUsersTokenRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);
