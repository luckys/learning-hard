<template>
  <div class="playground">
    <div class="playground__editor">
      <label class="playground__label">Email</label>
      <input v-model="form.email" type="email" class="playground__input">
      <label class="playground__label mt-4">Password</label>
      <input v-model="form.password" type="password" class="playground__input">
      <button class="playground__button" @click="handleSubmit">Sign In</button>
      <p v-if="error" class="playground__error">{{ error }}</p>
      <p v-if="success" class="playground__success">Signed in as {{ lastEmail }}</p>
    </div>
    <div class="playground__preview">
      <slot name="preview">
        <p class="playground__preview-placeholder">Preview will render here.</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SignInFormState {
  email: string
  password: string
}

const form = reactive<SignInFormState>({
  email: '',
  password: '',
})

const error = ref<string | null>(null)
const success = ref(false)
const lastEmail = ref('')

const handleSubmit = () => {
  error.value = null
  success.value = false

  const hasAtSymbol = form.email.includes('@')
  if (!hasAtSymbol) {
    error.value = 'Please enter a valid email.'
    return
  }

  const passwordValid = form.password.length >= 8
  if (!passwordValid) {
    error.value = 'Password must be at least 8 characters.'
    return
  }

  lastEmail.value = form.email
  success.value = true
  form.email = ''
  form.password = ''
}
</script>

<style scoped>
.playground {
  display: grid;
  gap: 1.5rem;
}

.playground__editor {
  background: rgba(15, 23, 42, 0.7);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.playground__preview {
  background: rgba(15, 23, 42, 0.4);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px dashed rgba(148, 163, 184, 0.2);
  text-align: center;
}

.playground__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #cbd5f5;
}

.playground__input {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.6);
  color: #fff;
}

.playground__button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #38bdf8;
  color: #0f172a;
  font-weight: 600;
}

.playground__error {
  margin-top: 0.75rem;
  color: #f87171;
}

.playground__success {
  margin-top: 0.75rem;
  color: #22c55e;
}

.playground__preview-placeholder {
  color: rgba(148, 163, 184, 0.8);
}
</style>
