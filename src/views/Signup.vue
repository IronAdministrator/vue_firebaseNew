<script setup>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { error, signup, isPending } = useSignup();

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  console.log(email.value, password.value)
  const res = await signup(email.value, password.value);
  if (!error.value) {
    console.log("user signed up");
    router.push({ name: "Home" });
    email.value = ''
    password.value = ''
  }
}

</script>
    
<template>
  <form @submit.prevent="handleSubmit">
    <h2>Sign up</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <div v-if="error" class="error">{{ error }}</div>

    <button :disabled="isPending">{{ isPending ? "Loading..." : "Sign up" }}</button>
  </form>
</template>
