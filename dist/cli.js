#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectEnv_1 = require("./src/InjectEnv");
const commandLine = new InjectEnv_1.InjectEnvCommandLine();
commandLine.execute();
