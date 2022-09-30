import { compare } from "bcrypt";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    tel: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private UsersTokenRepository: IUsersTokenRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, auth.secret_token, {
      subject: user.email,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign(
      {
        email,
      },
      auth.secret_refresh_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    const refresh_token_expires_date = dayjs()
      .add(auth.expires_refresh_token_days, "days")
      .toDate();

    await this.UsersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
        tel: user.tel,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
