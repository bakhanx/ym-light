import jwt from "jsonwebtoken";

const JWT_SECERT = process.env.JWT_SECRET!;

type TokenPayload = {
  userId: number;
};

export const createToken = (userId: number) => {
  try {
    const token = jwt.sign({ userId }, JWT_SECERT, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.log("토큰생성 에러", error);
    throw error;
  }
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECERT) as TokenPayload;
    return decoded;
  } catch (error) {
    console.log("Invalid Token", error);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("jwt-token");
  if (token) {
    const decodedToken = verifyToken(token);
    if (decodedToken) {
      return decodedToken.userId;
    }
  }
  return null;
};
