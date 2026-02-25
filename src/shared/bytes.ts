import { utils, getPublicKey } from '@noble/secp256k1'

export const randomBytes = (length: number) => {
  const bytes = new Uint8Array(length)

  crypto.getRandomValues(bytes)

  return bytes
}

export const createKeypair = () => {
  const privateKey = utils.randomSecretKey()

  return [privateKey, getPublicKey(privateKey)]
}
