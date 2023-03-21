import { CommandLineAction } from '@rushstack/ts-command-line';
export declare class InjectAction extends CommandLineAction {
    private _dir;
    get dir(): string;
    private _cp?;
    get cp(): string | undefined;
    private _envVariablePrefix;
    get envVariablePrefix(): string;
    protected onDefineParameters(): void;
    constructor();
    protected onExecute(): Promise<void>;
}
