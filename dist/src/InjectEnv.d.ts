import { CommandLineParser } from '@rushstack/ts-command-line';
export declare class InjectEnvCommandLine extends CommandLineParser {
    constructor();
    protected onDefineParameters(): void;
    protected onExecute(): Promise<void>;
}
