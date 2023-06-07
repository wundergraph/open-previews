import { User } from "@wundergraph/sdk/client";
import { createSecretKey } from "node:crypto";
import jwt, { JwtPayload } from "jsonwebtoken";

const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return createSecretKey(process.env.JWT_SECRET, "utf-8");
};

export const encodeUserToken = async (user: User) => {
  const secret = getSecret();

  // @todo this is not encoded.
  return jwt.sign({ token: user.rawAccessToken }, secret, { expiresIn: "2h" });
};

export const decodeUserToken = async (token: string): Promise<string> => {
  const secret = getSecret();

  const decoded = jwt.verify(token, secret) as JwtPayload;

  return decoded?.token;
};
