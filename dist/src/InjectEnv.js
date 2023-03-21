"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectEnvCommandLine = void 0;
const ts_command_line_1 = require("@rushstack/ts-command-line");
const BuildAction_1 = require("./actions/BuildAction");
const InjectAction_1 = require("./actions/InjectAction");
const Config_1 = require("./app/Config");
const SetAction_1 = require("./actions/SetAction");
class InjectEnvCommandLine extends ts_command_line_1.CommandLineParser {
    constructor() {
        super({
            toolFilename: Config_1.Cfg.NAME,
            toolDescription: 'This tool is used to inject environment variables into your react /build folder.',
        });
        this.addAction(new BuildAction_1.BuildAction());
        this.addAction(new InjectAction_1.InjectAction());
        this.addAction(new SetAction_1.SetAction());
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDefineParameters() { }
    onExecute() {
        return super.onExecute();
    }
}
exports.InjectEnvCommandLine = InjectEnvCommandLine;
