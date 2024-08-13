"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const typeDefs_1 = require("./typeDefs");
const resolver_1 = require("./resolver");
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
exports.user = { typeDefs: typeDefs_1.typeDefs, resolver: resolver_1.resolver, mutation: mutation_1.mutation, queries: queries_1.queries };
