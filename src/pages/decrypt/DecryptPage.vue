<script setup lang="ts">
import { useDecryptPage } from './hook'

const { address, privateKey, encryptedText } = useDecryptPage()
</script>

<template>
  <textarea v-model="encryptedText" name="encrypted-text" />
  <div>{{ address }}</div>

  <label>
    <span>Private key</span>

    <input
      v-model="privateKey"
      type="password"
      name="private-key"
      :disabled="!address"
    />
  </label>
</template>
