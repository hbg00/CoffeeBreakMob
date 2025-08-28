// TODO: Prepare consts for Google OAuth
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URI = `${process.env.EXPO_PUBIC_BASE_URL}/(auth)/oauth2redirect`;
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export const COOKIE_NAME = "auth_token";
export const REFRESH_COOKIE_NAME = "refresh_token";
export const COOKIE_MAX_AGE = 20;
export const JWT_TOKEN_EXPIRATION_TIME = "25s"; //TODO: dev purpose change after finish
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = "30d";
export const JWT_REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;
export const JWT_REFRESH_TOKEN_BEFORE_EXPIRATION_TIME = 60;

export const BASE_URL = process.env.EXPO_PUBIC_BASE_URL;
export const SCHEME = process.env.EXPO_PUBLIC_SCHEME;
export const JWT_SECRET = process.env.JWT_SECRET;

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
};

export const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax" as const,
    path: "/api/auth/refresh-token",
    maxAge: JWT_REFRESH_TOKEN_MAX_AGE,
};