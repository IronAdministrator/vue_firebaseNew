<script setup>
import { ref, watchEffect } from 'vue'
import useLogout from '@/composables/useLogout';
import { useRoute, useRouter } from "vue-router";
import getUser from "@/composables/getUser";

const route = useRoute();
const router = useRouter();

const { error, logout, isPending } = useLogout();

const { user } = getUser();

const handleLogout = async () => {
    await logout()
    if (!error.value) {
        console.log("user logged out!");
        // router.push({ name: "LoginView" });
    }
};

watchEffect(() => {
    if (!user.value) {
        router.push({ name: "Login" });
    }
})
</script>

<template>
    <div>
        <nav>
            <div class="logo">
                <h1>My Book List</h1>
                <small v-if="user">{{ user.email }}</small>
            </div>
            <!-- for logged in users -->
            <div v-if="user">
                <router-link :to="{ name: 'UserBooks' }">My Books</router-link>
                <router-link to="/">Home</router-link>
                <button @click="handleLogout">Logout</button>
            </div>

            <!-- for logged out users -->
            <div v-if="!user">
                <router-link to="/login">Login</router-link>
                <router-link to="/signup">Signup</router-link>
            </div>
        </nav>
    </div>
</template>

<style>
nav {
    display: flex;
    align-items: center;
}

nav .logo {
    margin-right: auto;
    margin-bottom: 0;
}

nav h1 {
    margin-bottom: 0;
}

nav a {
    margin-left: 16px;
    color: #2c3e50;
}

nav button {
    margin-left: 16px;
}

nav a.router-link-exact-active {
    color: #0ec58e;
}

nav+p {
    margin-top: 0;
    margin-bottom: 30px;
}
</style>
