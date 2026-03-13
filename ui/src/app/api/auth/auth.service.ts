import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from "./auth.constant";
import { User } from "./auth.types";

export class AuthService {
  static async login(username: string, password: string) {
    const user = await AuthRepository.findByUserName(username);
    if (!user) throw new Error("Tài khoản hoặc mật khẩu không chính xác.");
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error("Tài khoản hoặc mật khẩu không chính xác.");
    const accessToken = jwt.sign(
      { userId: user.id, username },
      ACCESS_SECRET_KEY,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { userId: user.id, username },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" },
    );
    return {
      userid: user.id,
      accessToken,
      refreshToken,
    };
  }
  static async register(user: User) {
    const existUser = await AuthRepository.isUserExist(user.username);
    const exitsCode = await AuthRepository.isCodeExist(user.code);
    if (existUser || exitsCode) throw new Error("Tài khoản đã tồn tại.");
    return await AuthRepository.createUser(user);
  }
  static async forgot(code: string, username: string) {
    const user = await AuthRepository.findByCodeAndUserName(code, username);
    if (!user) throw new Error("Tài khoản không tồn tại.");
    return {
      userid: user.id,
    };
  }
  static async reset(userid: string, newPassword: string) {
    const user = await AuthRepository.findPassWordByUserId(userid);
    if (!user) throw new Error("Tài khoản không tồn tại.");
    const oldPassword = user.password_hash;
    const isSame = await bcrypt.compare(newPassword, oldPassword);
    if (isSame) throw new Error("Mật khẩu mới phải khác mật khẩu cũ.");
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const updated = await AuthRepository.updatePasswordByUserId(
      userid,
      hashPassword,
    );
    if (!updated) throw new Error("Thay đổi mật khẩu thất bại.");
    return {
      message: "Đổi mật khẩu thành công.",
    };
  }
  static async refreshToken(token: string) {
    try {
      const user = jwt.verify(token, REFRESH_SECRET_KEY) as {
        userId: string;
        username: string;
      };
      if (!user.userId) throw new Error("Không tìm thấy tài khoản.");
      const accessToken = jwt.sign(
        { userId: user.userId, username: user.username },
        ACCESS_SECRET_KEY,
        { expiresIn: "15m" },
      );
      return { userId: user.userId, accessToken };
    } catch (err: any) {
      throw new Error("Token không hợp lệ.");
    }
  }
  static async getInfo(userId: string) {
    const result = await AuthRepository.findInfoByUserId(userId);
    if (!result) throw new Error("Tài khoản không tồn tại.");
    return result;
  }
  static async updateProfile(
    userId: string,
    fullname: string,
    username: string,
  ) {
    const exist = await AuthRepository.findByUserName(username);
    if (exist && exist.id !== userId)
      throw new Error("Tên người dùng đã tồn tại.");
    const result = await AuthRepository.updateProfile(
      userId,
      fullname,
      username,
    );
    if (!result) throw new Error("Cập nhật thất bại.");
    return result;
  }
}
