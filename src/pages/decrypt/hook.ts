import { ref, watch, computed } from 'vue'
import { hexlify, getAddress } from 'ethers'
import { base64ToUint8Array } from 'uint8array-extras'
import { utils, getSharedSecret } from '@noble/secp256k1'

import { sha256, parseKey, decryptString, writeToClipboard } from '@/shared'

export const useDecryptPage = () => {
  const privateKey = ref('')
  const encryptedText = ref('')
  const decryptedText = ref('')

  const encryptedArray = computed(() => {
    try {
      return base64ToUint8Array(encryptedText.value)
    } catch {
      return null
    }
  })

  const address = computed(() => {
    if (!encryptedArray.value || encryptedArray.value.length < 82) {
      return ''
    }

    return getAddress(hexlify(encryptedArray.value.slice(0, 20)))
  })

  watch(privateKey, value => {
    if (!value || !encryptedArray.value) {
      return
    }

    privateKey.value = ''
    decryptedText.value = ''

    writeToClipboard(hexlify(utils.randomSecretKey()))

    const recipientPrivate = parseKey(value)

    if (!recipientPrivate) {
      return
    }

    const ephemeralPublic = encryptedArray.value.slice(20, 20 + 33)
    const iv = encryptedArray.value.slice(20 + 33, 20 + 33 + 12)
    const ciphertext = encryptedArray.value.slice(20 + 33 + 12)

    const sharedSecret = getSharedSecret(
      recipientPrivate,
      ephemeralPublic,
      true,
    )

    sha256(sharedSecret)
      .then(key => decryptString(ciphertext, key, iv, ephemeralPublic))
      .then(decrypted => (decryptedText.value = decrypted))
  })

  return {
    address,
    privateKey,
    encryptedText,
    decryptedText,
  }
}
