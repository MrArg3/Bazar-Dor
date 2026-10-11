import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;
const authSecret = process.env.BETTER_AUTH_SECRET;
const authUrl = process.env.BETTER_AUTH_URL;

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
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? {
                  google: {
                      clientId: process.env.GOOGLE_CLIENT_ID,
                      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                  },
              }
            : {}),
        ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
            ? {
                  github: {
                      clientId: process.env.GITHUB_CLIENT_ID,
                      clientSecret: process.env.GITHUB_CLIENT_SECRET,
                  },
              }
            : {}),
    },
});
