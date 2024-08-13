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
exports.resolver = void 0;
const user_1 = __importDefault(require("../service/user"));
const user_2 = __importDefault(require("../model/user"));
const queries = {
    getuserdetailTokken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield user_1.default.getuserTokken(payload);
        return data;
    }),
    getCurrentLoggedInUser: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const user = yield user_2.default.findOne(id);
            return user;
        }
        throw new Error("I dont know who are you");
    }),
};
const mutation = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user_1.default.createUser(payload);
        return `user is created successfullly ${result._id}`;
    })
};
exports.resolver = { queries, mutation };
