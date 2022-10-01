import * as jwt from 'jsonwebtoken';

const privateKey = 'asdasdasdasdadsas';

export function signJwt(payload) {
  return jwt.sign(payload, privateKey);
}

export function decode(token: string) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, privateKey);

    return decoded;
  } catch (error) {
    console.error(`error`, error);
    return null;
  }
}
