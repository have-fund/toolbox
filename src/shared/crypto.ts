const encoder = new TextEncoder()

const importAesKey = async (rawKey: Uint8Array) => {
  if (rawKey.length !== 32) {
    throw new Error('AES-256 key must be 32 bytes')
  }

  return crypto.subtle.importKey(
    'raw',
    rawKey as BufferSource,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  )
}

const getAesAlgorithm = (iv: Uint8Array, additionalData: Uint8Array) => ({
  iv,
  additionalData,
  tagLength: 128,
  name: 'AES-GCM',
})

export const sha256 = async (buffer: Uint8Array) =>
  new Uint8Array(await crypto.subtle.digest('SHA-256', buffer as BufferSource))

export const encryptString = async (
  source: string,
  key: Uint8Array,
  iv: Uint8Array,
  ephemeralPubkey: Uint8Array,
) => {
  const aesKey = await importAesKey(key)

  return new Uint8Array(
    await crypto.subtle.encrypt(
      getAesAlgorithm(iv, ephemeralPubkey),
      aesKey,
      encoder.encode(source),
    ),
  )
}
