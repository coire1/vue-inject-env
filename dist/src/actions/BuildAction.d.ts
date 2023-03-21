import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class BuildAction extends CommandLineAction {
    private _userCommand;
    get userCommand(): string;
    private _dotEnvEnabled;
    get dotEnvEnabled(): boolean;
    private _bypassEnvVar;
    get bypassEnvVar(): string[];
    private _envVariablePrefix;
    get envVariablePrefix(): string;
    constructor();
    protected onExecute(): Promise<void>;
    protected onDefineParameters(): void;
}
