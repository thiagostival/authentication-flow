import dayjs from "dayjs";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { auth } from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { sub: user_id, email } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const userT = await this.usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userT) {
      throw new AppError("Refresh token is invalid.", 401);
    }

    await this.usersTokenRepository.deleteById(userT.id);

    const refresh_token = sign(
      {
        email,
      },
      auth.secret_refresh_token,
      {
        subject: user_id,
        expiresIn: auth.expires_in_refresh_token,
      }
    );

    const expires_date = dayjs()
      .add(auth.expires_refresh_token_days, "days")
      .toDate();

    await this.usersTokenRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: email,
      expiresIn: auth.expires_in_token,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}

export { RefreshTokenUseCase };
