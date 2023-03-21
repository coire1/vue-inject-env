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
exports.BuildAction = void 0;
const ts_command_line_1 = require("@rushstack/ts-command-line");
const Utils_1 = require("../utils/Utils");
const shelljs_1 = __importDefault(require("shelljs"));
const commons_1 = require("@aelesia/commons");
const Parse_1 = require("../utils/Parse");
const Format_1 = require("../utils/Format");
class BuildAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'build',
            summary: 'Build your react app with placeholder variables',
            documentation: 'TODO'
        });
    }
    get userCommand() {
        return (0, Parse_1.parseCommand)(this._userCommand.values);
    }
    get dotEnvEnabled() {
        return (0, Parse_1.parseBoolean)(this._dotEnvEnabled.value);
    }
    get bypassEnvVar() {
        return this._bypassEnvVar.values;
    }
    get envVariablePrefix() {
        // --prefix has a default value of 'VITE_'
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this._envVariablePrefix.value;
    }
    onExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            const dotEnvCfg = this.dotEnvEnabled ? (0, Utils_1.retrieveDotEnvCfg)(this.envVariablePrefix) : {};
            const env = Object.assign(Object.assign({}, dotEnvCfg), (0, Utils_1.retrieveReactEnvCfg)(this.envVariablePrefix));
            console.info('Building with the following variables', commons_1.Obj.pick(env, this.bypassEnvVar));
            const filteredEnv = commons_1.Obj.omit(env, this.bypassEnvVar);
            console.info('Replacing the following variables with placeholders', Object.keys(filteredEnv));
            const command = `${(0, Format_1.formatEnvToCliString)(filteredEnv)} ${this.userCommand}`;
            console.info('Executing script', `'${this.userCommand}'`);
            shelljs_1.default.exec(command);
        });
    }
    onDefineParameters() {
        this._dotEnvEnabled = this.defineChoiceParameter({
            parameterLongName: '--dotenv',
            required: false,
            alternatives: ['true', 'false'],
            defaultValue: 'true',
            description: 'Automatically reads from .env file in /root folder. Default: true'
        });
        this._bypassEnvVar = this.defineStringListParameter({
            parameterLongName: '--bypass',
            description: 'vue-inject-env will use these environment variables when building and not substitute placeholders',
            argumentName: 'ENV_VARIABLE_NAME'
        });
        this._envVariablePrefix = this.defineStringParameter({
            description: 'Specify the prefix of environment variables to load',
            parameterLongName: '--prefix',
            parameterShortName: '-p',
            argumentName: 'ENV_VAR_PREFIX',
            defaultValue: 'VITE_',
            required: false
        });
        this._userCommand = this.defineCommandLineRemainder({
            description: 'Enter your build command here (eg. `vue-inject-env build npm run build`)'
        });
    }
}
exports.BuildAction = BuildAction;
