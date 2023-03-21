import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class SetAction extends CommandLineAction {
    private _dir;
    get dir(): string;
    private _fileName;
    get fileName(): string;
    private _varName;
    get varName(): string;
    private _envVariablePrefix;
    get envVariablePrefix(): string;
    protected onDefineParameters(): void;
    constructor();
    protected onExecute(): Promise<void>;
}
