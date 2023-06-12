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
  return jwt.sign(
    { accessToken: user.rawAccessToken, name: user.name, email: user.email },
    secret,
    { expiresIn: "2h" }
  );
};

interface Token {
  accessToken: string;
  name: string;
  email: string;
}

export const verifyToken = async (token: string): Promise<Token> => {
  const secret = getSecret();
  const decoded = jwt.verify(token, secret) as Token;
  return decoded;
};
