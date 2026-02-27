import { ref, computed } from 'vue'
import { hexlify, getAddress } from 'ethers'
import { base64ToUint8Array } from 'uint8array-extras'

export const useDecryptPage = () => {
  const privateKey = ref('')
  const encryptedText = ref('')

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

  return {
    address,
    privateKey,
    encryptedText,
  }
}
