import { pool } from "../../db"
import type { IProfile } from "./profile.interface";

const createProfileIntoDB = async (payload: IProfile) => {
  const { user_id, bio, address, phone, gender } = payload;
  const result = pool.query(
    `
        INSERT INTO profile(user_id, bio, address, phone, gender)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `,
    [user_id, bio, address, phone, gender],
  );
  return result;
};


export const profileService = {
    createProfileIntoDB
}