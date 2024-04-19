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
exports.Shemas = exports.validateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
function validateSchema(schema, property) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            switch (property) {
                case 'params':
                    yield schema.validateAsync(req.params);
                    break;
                case 'query':
                    yield schema.validateAsync(req.query);
                    break;
                default:
                    yield schema.validateAsync(req.body);
            }
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(422).json({ message: error.details[0].message });
        }
    });
}
exports.validateSchema = validateSchema;
exports.Shemas = {
    user: {
        create: joi_1.default.object({
            role: joi_1.default.string().valid('employee', 'admin', 'member').required(),
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required()
        }),
        login: joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required()
        }),
        update: joi_1.default.object({
            _id: joi_1.default.string().required().regex(/^[0-9a-fA-F]{24}$/),
            role: joi_1.default.string().valid('employee', 'admin', 'member').required(),
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
        }).unknown(),
        id: joi_1.default.object({
            id: joi_1.default.string().required().regex(/^[0-9a-fA-F]{24}$/)
        })
    }
};
