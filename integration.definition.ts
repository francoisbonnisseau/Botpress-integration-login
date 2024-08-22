import { IntegrationDefinition , z} from '@botpress/sdk'
import { integrationName } from './package.json'

export default new IntegrationDefinition({
  name: integrationName,
  version: '0.0.1',
  readme: 'hub.md',
  icon: 'icon.svg',
  title: 'Login System - crypto',
  description: 'Action for a login system using crypto',
  channels: {},
  actions: {
    generateSalt: {
      title: 'Generate Salt',
      description: 'Generate a random salt',
      input: {
        schema: z.object({
          length: z.number().default(16),
        }),
      },
      output: {
        schema: z.object({
          salt: z.string(),
        }),
      },
    },
    hashPassword: {
      title: 'Hash Password',
      description: 'Hash a password using a salt',
      input: {
        schema: z.object({
          password: z.string(),
          salt: z.string(),
          iterations: z.number().default(100000),
          keylength: z.number().default(64),
        }),
      },
      output: {
        schema: z.object({
          hash: z.string(),
        }),
      },
    },

  }
})
