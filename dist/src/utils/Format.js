"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEnvCommand = exports.formatEnvToCliString = void 0;
const Config_1 = require("../app/Config");
function formatEnvToCliString(env) {
    let envString = '';
    Object.keys(env).forEach((key) => {
        envString += `${key}=${Config_1.Cfg.PLACEHOLDER_2}${key} `;
    });
    return envString;
}
exports.formatEnvToCliString = formatEnvToCliString;
function formatEnvCommand(env, command) {
    return `${formatEnvToCliString(env)} ${command}`;
}
exports.formatEnvCommand = formatEnvCommand;
