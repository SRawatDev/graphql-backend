"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const db_js_1 = __importDefault(require("./connection/db.js"));
const index_js_1 = require("./user/index.js");
const user_js_1 = __importDefault(require("./service/user.js"));
const port = 4000;
function graphqlServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        const typeDefs = `
      ${index_js_1.user.typeDefs}
        type Query {
            ${index_js_1.user.queries}
        }
        type Mutation {
            ${index_js_1.user.mutation}
        }
    `;
        const resolvers = {
            Query: Object.assign({}, index_js_1.user.resolver.queries),
            Mutation: Object.assign({}, index_js_1.user.resolver.mutation)
        };
        const server = new server_1.ApolloServer({
            typeDefs,
            resolvers,
        });
        yield server.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                const token = req.headers["token"];
                try {
                    const user = yield user_js_1.default.decodeTokken(token);
                    return { user };
                }
                catch (error) {
                    console.error("Token decoding failed:", error.message);
                    return {};
                }
            }),
        }));
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        yield (0, db_js_1.default)();
    });
}
graphqlServer();
