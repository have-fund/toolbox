import { hexToUint8Array } from 'uint8array-extras'
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

export const parseKey = (keyHex: string) => {
  try {
    return hexToUint8Array(keyHex.startsWith('0x') ? keyHex.slice(2) : keyHex)
  } catch {
    return null
  }
}
