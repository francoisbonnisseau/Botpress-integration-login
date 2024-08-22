import * as sdk from '@botpress/sdk'
import * as bp from '.botpress'
import crypto from 'crypto'

export default new bp.Integration({
  register: async () => {},
  unregister: async () => {},
  actions: {
    generateSalt: async (args) => {
      const length = args.input.length || 16
      const array = new Uint8Array(length)
      crypto.getRandomValues(array)
      const salt =  Array.from(array)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
      return {salt}
    },
    hashPassword: async (args) => {
      const password = args.input.password
      const salt = args.input.salt
      const iterations = args.input.iterations
      const keyLength = args.input.keylength || 64
      
      const encoder = new TextEncoder()
      const passwordData = encoder.encode(password)
      const saltData = encoder.encode(salt)

      const key = await crypto.subtle.importKey('raw', passwordData, { name: 'PBKDF2' }, false, ['deriveBits'])

      const derivedKey = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltData,
          iterations: iterations,
          hash: 'SHA-256'
        },
        key,
        keyLength * 8
      )

      const hash = Array.from(new Uint8Array(derivedKey))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')

      return {hash}
    }
  },
  channels: {},
  handler: async () => {},
})
