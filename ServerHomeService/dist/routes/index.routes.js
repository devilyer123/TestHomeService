"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("./route"));
const express_1 = require("express");
class Routes {
    constructor(app) {
        this.router = (0, express_1.Router)();
        this.app = app;
    }
    init() {
        route_1.default.init(this.router);
        this.app.use('/api/v1', this.router);
    }
}
exports.default = Routes;
//# sourceMappingURL=index.routes.js.map