<script setup>

import { ref } from 'vue'
import CreateBookForm from '@/components/CreateBookForm.vue';
import getCollection from '@/composables/getCollection';
import useDocument from '@/composables/useDocument.js';
import getUser from "@/composables/getUser";

const { user } = getUser();
const { documents: books } = getCollection('books', ["userUid", "==", user.value.uid])
const { deleteDocument, toggleFav, error, isPending } = useDocument('books')

const handleDelete = async (id) => {
    console.log(id);
    await deleteDocument(id)
}

const handleUpdate = async (book) => {
    console.log(book);
    await toggleFav(book)
}

</script>
    
<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isPending">Loading</div>
    <div v-if="books" class="home">
        <ul>
            <li v-for="book in books" :key="book.id">
                <div class="details">
                    <h3 @click="handleDelete(book.id)">{{ book.title }}</h3>
                    <p>By {{ book.author }}</p>
                </div>
                <div @click="handleUpdate(book)" class="icon" :class="{ active: book.isFav }">
                    <span class="material-icons">favorite</span>
                </div>
            </li>
        </ul>
        <div>{{ error }}</div>
        <CreateBookForm />
    </div>
</template>