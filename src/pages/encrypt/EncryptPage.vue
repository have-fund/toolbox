<script setup lang="ts">
import { useEncryptPage } from './hook'

const { address, publicKey, sourceText, copyResult, encryptionUnavailable } =
  useEncryptPage()
</script>

<template>
  <label>
    <span>Public key</span>

    <input
      v-model="publicKey"
      type="text"
      name="public-key"
      placeholder="Enter public key"
    />
  </label>

  <div>{{ address }}</div>
  <textarea v-model="sourceText" name="source-text" placeholder="Enter text" />
  <button :disabled="encryptionUnavailable" @click="copyResult">Copy</button>
</template>
