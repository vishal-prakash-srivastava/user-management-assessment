export interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
  };
}
