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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetAction = void 0;
const ts_command_line_1 = require("@rushstack/ts-command-line");
const File_1 = require("../utils/File");
const Utils_1 = require("../utils/Utils");
class SetAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'set',
            summary: 'Set environment variables into your React /build folder.',
            documentation: 'TODO'
        });
    }
    get dir() {
        // --dir has a default value of 'build'
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._dir.value;
    }
    get fileName() {
        // --dir has a default value of 'build'
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._fileName.value;
    }
    get varName() {
        // --var has a default value of 'env'
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._varName.value;
    }
    get envVariablePrefix() {
        // --prefix has a default value of 'REACT_APP_'
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._envVariablePrefix.value;
    }
    onDefineParameters() {
        this._dir = this.defineStringParameter({
            description: 'Specify the location of your build folder',
            parameterLongName: '--dir',
            parameterShortName: '-d',
            argumentName: 'PATH_TO_BUILD_FOLDER',
            defaultValue: './dist',
            required: false
        });
        this._fileName = this.defineStringParameter({
            description: 'Specify the name for the output env file',
            parameterLongName: '--name',
            parameterShortName: '-n',
            argumentName: 'NAME_OF_ENV_FILE',
            defaultValue: 'env.js',
            required: false
        });
        this._varName = this.defineStringParameter({
            description: 'Overwrite the variable name that will be stored in `window`',
            parameterLongName: '--var',
            parameterShortName: '-v',
            argumentName: 'VAR_NAME',
            defaultValue: 'env',
            required: false
        });
        this._envVariablePrefix = this.defineStringParameter({
            description: 'Specify the prefix of environment variables to load',
            parameterLongName: '--prefix',
            parameterShortName: '-p',
            argumentName: 'ENV_VAR_PREFIX',
            defaultValue: 'VITE_',
            required: false
        });
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            const envCfg = Object.assign(Object.assign({}, (0, Utils_1.retrieveDotEnvCfg)(this.envVariablePrefix)), (0, Utils_1.retrieveReactEnvCfg)(this.envVariablePrefix));
            (0, File_1.outputEnvFile)(this.dir, this.fileName, envCfg, this.varName);
        });
    }
}
exports.SetAction = SetAction;
