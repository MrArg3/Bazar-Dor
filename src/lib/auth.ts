import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;
const authSecret = process.env.BETTER_AUTH_SECRET;
const authUrl = process.env.BETTER_AUTH_URL;
const googleClientId = process.env.BETTER_AUTH_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.BETTER_AUTH_GITHUB_CLIENT_ID;
const githubClientSecret = process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET;

if (Boolean(googleClientId) !== Boolean(googleClientSecret)) {
    throw new Error(
        "BETTER_AUTH_GOOGLE_CLIENT_ID and BETTER_AUTH_GOOGLE_CLIENT_SECRET must both be set.",
    );
}

if (Boolean(githubClientId) !== Boolean(githubClientSecret)) {
    throw new Error(
        "BETTER_AUTH_GITHUB_CLIENT_ID and BETTER_AUTH_GITHUB_CLIENT_SECRET must both be set.",
    );
}

if (!databaseUrl || !authSecret || !authUrl) {
    throw new Error(
        "BETTER_AUTH_DB_URL, BETTER_AUTH_SECRET, and BETTER_AUTH_URL must be set.",
    );
}

const globalForMongo = globalThis as typeof globalThis & {
    authMongoClient?: MongoClient;
};

const mongoClient =
    globalForMongo.authMongoClient ??
    new MongoClient(databaseUrl);

if (process.env.NODE_ENV !== "production") {
    globalForMongo.authMongoClient = mongoClient;
}

export const auth = betterAuth({
    baseURL: authUrl,
    secret: authSecret,
    database: mongodbAdapter(mongoClient.db("bazar-dor"), { client: mongoClient }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        ...(googleClientId && googleClientSecret
            ? {
                  google: {
                      clientId: googleClientId,
                      clientSecret: googleClientSecret,
                  },
              }
            : {}),
        ...(githubClientId && githubClientSecret
            ? {
                  github: {
                      clientId: githubClientId,
                      clientSecret: githubClientSecret,
                  },
              }
            : {}),
    },
});
