<script setup>
import { ref } from 'vue'
import useLogin from '@/composables/useLogin';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { error, login, isPending } = useLogin();

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  console.log(email.value, password.value)
  const res = await login(email.value, password.value);
  if (!error.value) {
    console.log("user logged in up");
    router.push({ name: "Home" });
    email.value = ''
    password.value = ''
  }
}

</script>
    
<template>
  <form @submit.prevent="handleSubmit">
    <h2>Login</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <button>Login</button>
    <div v-if="error"> {{ error }}</div>
  </form>
</template>
