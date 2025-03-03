import replace from 'replace-in-file'
import shell from 'shelljs'
import { Cfg } from '../app/Config'
import { retrieveDotEnvCfg, retrieveVueEnvCfg } from './Utils'
import { writeFileSync } from 'fs'

function generateFromTo(envCfg: Record<string, string>): {
  from: string[] | RegExp[]
  to: string[]
} {
  const from = Object.keys(envCfg)
    .map((key) => `${Cfg.PLACEHOLDER_2}${key}`)
    .map((key) => new RegExp(`\\b${key}\\b`, 'g'))
  const to = Object.values(envCfg)
  return {
    from: from,
    to: to
  }
}

export function copyFolder(dir: string, copyDir: string): string {
  shell.cp('-R', dir, copyDir)
  return copyDir
}

export function replaceFile(dirPath: string, envConfig: Record<string, string>): void {
  const { from, to } = generateFromTo(envConfig)
  const results = replace.sync({
    files: `${dirPath}/**/*`,
    from: from,
    to: to,
    countMatches: true
  })
  results.forEach((it) => {
    if (it.hasChanged) {
      console.info(`Replaced ${it.numReplacements} variable(s) in '${it.file}'`)
    }
  })
}

export function replaceFilesInDir(dir: string, envVariablePrefix: string): void {
  const envCfg = {
    ...retrieveDotEnvCfg(envVariablePrefix),
    ...retrieveVueEnvCfg(envVariablePrefix)
  }
  console.info('Injecting the following environment variables:')
  console.info(envCfg)
  replaceFile(dir, envCfg)
}

export function outputEnvFile(folder: string, fileName: string, envCfg: Record<string, string>, varName: string): void {
  shell.mkdir('-p', './build')
  console.info('Setting the following environment variables:')
  console.info(envCfg)
  writeFileSync(`${folder}/${fileName}`, `window.${varName} = ${JSON.stringify(envCfg, null, 2)}`)
}
