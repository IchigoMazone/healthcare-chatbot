import pool from "../lib/db";
import bcrypt from "bcrypt";
import { User } from "./auth.types";

export class AuthRepository {
  static async findByUserName(username: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = $1 LIMIT 1`,
      [username],
    );
    return result.rows[0] || null;
  }
  static async createUser(user: User) {
    const hashPassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO users (code, username, password_hash, fullname, avatar_url)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, username`;

    const values = [
      user.code,
      user.username,
      hashPassword,
      user.username,
      user.avatar_url ?? null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
  static async findByCodeAndUserName(code: string, username: string) {
    const result = await pool.query(
      `SELECT id FROM users WHERE code = $1 AND username = $2;`,
      [code, username],
    );
    return result.rows[0] || null;
  }
  static async findPassWordByUserId(userid: string) {
    const result = await pool.query(
      `SELECT password_hash FROM users WHERE id = $1`,
      [userid],
    );
    return result.rows[0] || null;
  }
  static async updatePasswordByUserId(userid: string, password: string) {
    const result = await pool.query(
      `UPDATE users SET password_hash = $1 WHERE id = $2`,
      [password, userid],
    );
    return result.rowCount === 1;
  }
  static async isCodeExist(code: string): Promise<boolean> {
    const result = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM users WHERE code = $1)`,
      [code],
    );
    return result.rows[0].exists;
  }
  static async isUserExist(username: string): Promise<boolean> {
    const result = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM users WHERE username = $1)`,
      [username],
    );
    return result.rows[0].exists;
  }
  static async findUserIdByUserName(username: string): Promise<string | null> {
    const result = await pool.query(
      `SELECT id FROM users WHERE username = $1`,
      [username],
    );
    return result.rows[0] || null;
  }
  static async findInfoByUserId(userId: string): Promise<Info> {
    const result = await pool.query(
      `SELECT username, code, fullname, avatar_url FROM users WHERE id = $1`,
      [userId],
    );
    return result.rows[0] || null;
  }
  static async updateProfile(
    userId: string,
    fullname: string,
    username: string,
  ) {
    const r = await pool.query(
      `UPDATE users SET fullname=$1, username=$2 WHERE id=$3 RETURNING id, fullname, username`,
      [fullname, username, userId],
    );
    return r.rows[0];
  }
}
