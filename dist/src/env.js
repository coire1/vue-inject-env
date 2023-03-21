"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
function getEnv(varName = 'env') {
    let env = {};
    if (typeof (process === null || process === void 0 ? void 0 : process.env) === 'object') {
        Object.assign(env, process.env);
    }
    // @ts-ignore
    if (typeof (window === null || window === void 0 ? void 0 : window[varName]) === 'object') {
        // @ts-ignore
        Object.assign(env, window[varName]);
    }
    return env;
}
exports.getEnv = getEnv;
const env = getEnv();
exports.default = env;
