import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserToken } from "../../entities/UserToken";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const uT = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(uT);

    return uT;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken | undefined> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { UsersTokenRepository };
