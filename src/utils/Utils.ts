export function retrieveVueEnvCfg(envVariablePrefix: string): Record<string, string> {
  const env = process.env
  const keys = Object.keys(env)
  const vueKeys = keys.filter((key) => {
    return key.startsWith(envVariablePrefix) || key === 'PUBLIC_URL'
  })

  const envCfg: Record<string, string> = {}
  for (const key of vueKeys) {
    envCfg[key] = process!.env[key]!
  }
  return envCfg
}

export function retrieveDotEnvCfg(envVariablePrefix: string): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const env = require('dotenv').config().parsed ?? {}

  const keys = Object.keys(env)
  const vueKeys = keys.filter((key) => {
    return key.startsWith(envVariablePrefix) || key === 'PUBLIC_URL'
  })

  const envCfg: Record<string, string> = {}
  for (const key of vueKeys) {
    envCfg[key] = process.env[key]!
  }
  return envCfg
}
