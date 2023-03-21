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
exports.InjectAction = void 0;
const ts_command_line_1 = require("@rushstack/ts-command-line");
const File_1 = require("../utils/File");
class InjectAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'inject',
            summary: 'Inject environment variables into your Vite /build folder.',
            documentation: 'TODO'
        });
    }
    get dir() {
        // --dir is a required variable
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._dir.value;
    }
    get cp() {
        var _a;
        return (_a = this._cp) === null || _a === void 0 ? void 0 : _a.value;
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
            required: true
        });
        this._cp = this.defineStringParameter({
            description: 'Specify the location of the new folder if you would like to make a copy',
            parameterLongName: '--output',
            parameterShortName: '-o',
            argumentName: 'PATH_TO_OUTPUT_FOLDER'
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
            let folder = this.dir;
            if (this.cp) {
                (0, File_1.copyFolder)(this.dir, this.cp);
                folder = this.cp;
            }
            (0, File_1.replaceFilesInDir)(folder, this.envVariablePrefix);
        });
    }
}
exports.InjectAction = InjectAction;
