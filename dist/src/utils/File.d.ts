export declare function copyFolder(dir: string, copyDir: string): string;
export declare function replaceFile(dirPath: string, envConfig: Record<string, string>): void;
export declare function replaceFilesInDir(dir: string, envVariablePrefix: string): void;
export declare function outputEnvFile(folder: string, fileName: string, envCfg: Record<string, string>, varName: string): void;
