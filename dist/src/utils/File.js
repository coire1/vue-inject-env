"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputEnvFile = exports.replaceFilesInDir = exports.replaceFile = exports.copyFolder = void 0;
const replace_in_file_1 = __importDefault(require("replace-in-file"));
const shelljs_1 = __importDefault(require("shelljs"));
const Config_1 = require("../app/Config");
const Utils_1 = require("./Utils");
const fs_1 = require("fs");
function generateFromTo(envCfg) {
    const from = Object.keys(envCfg)
        .map((key) => `${Config_1.Cfg.PLACEHOLDER_2}${key}`)
        .map((key) => new RegExp(`\\b${key}\\b`, 'g'));
    const to = Object.values(envCfg);
    return {
        from: from,
        to: to
    };
}
function copyFolder(dir, copyDir) {
    shelljs_1.default.cp('-R', dir, copyDir);
    return copyDir;
}
exports.copyFolder = copyFolder;
function replaceFile(dirPath, envConfig) {
    const { from, to } = generateFromTo(envConfig);
    const results = replace_in_file_1.default.sync({
        files: `${dirPath}/**/*`,
        from: from,
        to: to,
        countMatches: true
    });
    results.forEach((it) => {
        if (it.hasChanged) {
            console.info(`Replaced ${it.numReplacements} variable(s) in '${it.file}'`);
        }
    });
}
exports.replaceFile = replaceFile;
function replaceFilesInDir(dir, envVariablePrefix) {
    const envCfg = Object.assign(Object.assign({}, (0, Utils_1.retrieveDotEnvCfg)(envVariablePrefix)), (0, Utils_1.retrieveReactEnvCfg)(envVariablePrefix));
    console.info('Injecting the following environment variables:');
    console.info(envCfg);
    replaceFile(dir, envCfg);
}
exports.replaceFilesInDir = replaceFilesInDir;
function outputEnvFile(folder, fileName, envCfg, varName) {
    shelljs_1.default.mkdir('-p', './build');
    console.info('Setting the following environment variables:');
    console.info(envCfg);
    (0, fs_1.writeFileSync)(`${folder}/${fileName}`, `window.${varName} = ${JSON.stringify(envCfg, null, 2)}`);
}
exports.outputEnvFile = outputEnvFile;
