import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import connection from "./connection/db.js";
import { user } from "./user/index.js";
import userservice from "./service/user.js";

const port: number = 4000;

async function graphqlServer() {
    const app = express();
    app.use(express.json());

    const typeDefs = `
      ${user.typeDefs}
        type Query {
            ${user.queries}
        }
        type Mutation {
            ${user.mutation}
        }
    `;

    const resolvers = {
        Query: {
            ...user.resolver.queries
        },
        Mutation: {
            ...user.resolver.mutation
        }
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req }) => {
                const token = req.headers["token"] as string;
                try {

                    const user = await userservice.decodeTokken(token);
                    return { user };
                } catch (error:any) {
                    console.error("Token decoding failed:", error.message);
                    return {}; 
                }
            },
        }),
    );

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    await connection();
}

graphqlServer();
