"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveDotEnvCfg = exports.retrieveReactEnvCfg = void 0;
function retrieveReactEnvCfg(envVariablePrefix) {
    const env = process.env;
    const keys = Object.keys(env);
    const reactKeys = keys.filter((key) => {
        return key.startsWith(envVariablePrefix) || key === 'PUBLIC_URL';
    });
    const envCfg = {};
    for (const key of reactKeys) {
        envCfg[key] = process.env[key];
    }
    return envCfg;
}
exports.retrieveReactEnvCfg = retrieveReactEnvCfg;
function retrieveDotEnvCfg(envVariablePrefix) {
    var _a;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const env = (_a = require('dotenv').config().parsed) !== null && _a !== void 0 ? _a : {};
    const keys = Object.keys(env);
    const reactKeys = keys.filter((key) => {
        return key.startsWith(envVariablePrefix) || key === 'PUBLIC_URL';
    });
    const envCfg = {};
    for (const key of reactKeys) {
        envCfg[key] = process.env[key];
    }
    return envCfg;
}
exports.retrieveDotEnvCfg = retrieveDotEnvCfg;
