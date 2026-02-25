import { ref, computed } from 'vue'
import { computeAddress } from 'ethers'
import { getSharedSecret } from '@noble/secp256k1'
import {
  hexToUint8Array,
  concatUint8Arrays,
  uint8ArrayToBase64,
} from 'uint8array-extras'

import {
  sha256,
  randomBytes,
  createKeypair,
  encryptString,
  writeToClipboard,
} from '@/shared'

const COPY_DELAY_TIME = 400

export const useEncryptPage = () => {
  const publicKey = ref('')
  const sourceText = ref('')
  const copyInProgress = ref(false)

  const publicKeyWithPrefix = computed(() =>
    publicKey.value.startsWith('0x') ? publicKey.value : `0x${publicKey.value}`,
  )

  const address = computed(() => {
    try {
      return computeAddress(publicKeyWithPrefix.value)
    } catch {
      return ''
    }
  })

  const encryptionUnavailable = computed(
    () => !address.value || !sourceText.value || copyInProgress.value,
  )

  const createResult = async () => {
    const iv = randomBytes(12)
    const [ephemeralPrivate, ephemeralPublic] = createKeypair()

    const sharedSecret = getSharedSecret(
      ephemeralPrivate,
      hexToUint8Array(publicKeyWithPrefix.value.slice(2)),
      true,
    )

    const key = await sha256(sharedSecret)

    const encrypted = await encryptString(
      sourceText.value,
      key,
      iv,
      ephemeralPublic,
    )

    return uint8ArrayToBase64(
      concatUint8Arrays([
        hexToUint8Array(address.value.slice(2)),
        ephemeralPublic,
        iv,
        encrypted,
      ]),
    )
  }

  const copyResult = () => {
    if (encryptionUnavailable.value) {
      return
    }

    writeToClipboard(createResult())

    copyInProgress.value = true

    setTimeout(() => {
      copyInProgress.value = false
    }, COPY_DELAY_TIME)
  }

  return {
    address,
    publicKey,
    sourceText,
    copyResult,
    encryptionUnavailable,
  }
}
