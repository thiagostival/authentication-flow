import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IGetUserDTO } from "../../dtos/IGetUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IResponse extends Omit<User, "password"> {}

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email }: IGetUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`User not found.`, 400, "user.notFound");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return rest;
  }
}

export { GetUserUseCase };
