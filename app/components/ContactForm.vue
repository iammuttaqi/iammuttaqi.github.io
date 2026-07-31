<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

interface ContactState {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — must stay empty. Bots fill it, humans never see it. */
  website: string
}

const state = reactive<ContactState>({
  name: '',
  email: '',
  subject: '',
  message: '',
  website: ''
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorMessage = ref('')
const startedAt = Date.now()

function validate(state: ContactState): FormError[] {
  const errors: FormError[] = []

  if (state.name.trim().length < 2) {
    errors.push({ name: 'name', message: 'Tell me who you are.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({ name: 'email', message: 'A valid email, so I can reply.' })
  }

  if (state.subject.trim().length < 3) {
    errors.push({ name: 'subject', message: 'A short subject line helps.' })
  }

  if (state.message.trim().length < 20) {
    errors.push({ name: 'message', message: 'At least 20 characters, please.' })
  }

  return errors
}

async function onSubmit(event: FormSubmitEvent<ContactState>) {
  status.value = 'sending'
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...event.data, elapsedMs: Date.now() - startedAt }
    })

    status.value = 'sent'
    Object.assign(state, { name: '', email: '', subject: '', message: '', website: '' })
  } catch (error) {
    status.value = 'error'
    errorMessage.value = (error as { data?: { message?: string } })?.data?.message
      ?? 'Something went wrong. Email me directly instead.'
  }
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="space-y-5"
    @submit="onSubmit"
  >
    <div class="grid gap-5 sm:grid-cols-2">
      <UFormField
        label="Name"
        name="name"
        required
      >
        <UInput
          v-model="state.name"
          placeholder="Ada Lovelace"
          autocomplete="name"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Email"
        name="email"
        required
      >
        <UInput
          v-model="state.email"
          type="email"
          placeholder="ada@example.com"
          autocomplete="email"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField
      label="Subject"
      name="subject"
      required
    >
      <UInput
        v-model="state.subject"
        placeholder="Contract work — API rewrite"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Message"
      name="message"
      required
    >
      <UTextarea
        v-model="state.message"
        :rows="6"
        placeholder="What are you building, and where does it hurt?"
        class="w-full"
      />
    </UFormField>

    <!-- Honeypot: visually and programmatically hidden from humans -->
    <div
      class="absolute -left-[9999px]"
      aria-hidden="true"
    >
      <label for="website">Website</label>
      <input
        id="website"
        v-model="state.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      >
    </div>

    <div class="flex flex-wrap items-center gap-4 pt-1">
      <UButton
        type="submit"
        size="lg"
        label="Send message"
        trailing-icon="i-lucide-send"
        :loading="status === 'sending'"
        :disabled="status === 'sending'"
        class="font-medium"
      />

      <p
        v-if="status === 'sent'"
        class="flex items-center gap-2 text-sm text-success"
      >
        <UIcon
          name="i-lucide-check-circle-2"
          class="size-4"
        />
        Message sent. Talk soon.
      </p>

      <p
        v-else-if="status === 'error'"
        class="flex items-center gap-2 text-sm text-error"
      >
        <UIcon
          name="i-lucide-triangle-alert"
          class="size-4"
        />
        {{ errorMessage }}
      </p>
    </div>
  </UForm>
</template>
