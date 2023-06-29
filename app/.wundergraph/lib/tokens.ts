import { User } from "@wundergraph/sdk/client";
import { createSecretKey } from "node:crypto";

import jose from "jose";

const tokenExp = process.env.TOKEN_EXP || "2h";

const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return createSecretKey(process.env.JWT_SECRET, "utf-8");
};

export const encodeUserToken = async (user: User) => {
  const secret = getSecret();

  const jwt = await new jose.EncryptJWT({
    accessToken: user.rawAccessToken,
    name: user.name,
    email: user.email,
    profilePicture: user.profile,
  })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer("urn:open-previews")
    .setAudience("urn:open-previews:user")
    .encrypt(secret);

  return jwt;
};

export interface Token {
  accessToken: string;
  name: string;
  email: string;
  profilePicture: string;
}

export const verifyToken = async (
  token: string,
  ignoreExpiration?: boolean
): Promise<Token> => {
  const secret = getSecret();
  const { payload } = await jose.jwtDecrypt(token, secret, {
    issuer: "urn:open-previews",
    audience: "urn:open-previews:user",
    maxTokenAge: ignoreExpiration ? undefined : tokenExp,
  });

  return payload as unknown as Token;
};
