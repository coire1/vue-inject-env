"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBoolean = exports.parseCommand = exports.validateCommand = exports.validateDotEnvExists = void 0;
function validateDotEnvExists(param) {
    if (typeof param === 'object' && param != null) {
        return param;
    }
    throw TypeError('dotenv file not found');
}
exports.validateDotEnvExists = validateDotEnvExists;
function validateCommand(command) {
    if (typeof command !== 'string' || !command) {
        throw TypeError(`Command must be be valid: ${command}`);
    }
    return command;
}
exports.validateCommand = validateCommand;
function parseCommand(params) {
    const command = validateCommand(params.join(' '));
    return command;
}
exports.parseCommand = parseCommand;
function parseBoolean(param) {
    if (param === 'true') {
        return true;
    }
    else if (param === 'false') {
        return false;
    }
    throw TypeError(`Expected 'true' or 'false', received: ${param}`);
}
exports.parseBoolean = parseBoolean;
