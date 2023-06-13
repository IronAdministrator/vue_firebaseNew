<script setup>
import { ref } from 'vue'
import CreateBookForm from '@/components/CreateBookForm.vue';
import getCollection from '@/composables/getCollection';
import useDocument from '@/composables/useDocument.js';
import getUser from "@/composables/getUser";

// get data - not realtime
// const books = ref([])
// const colRef = collection(db, 'books')
// getDocs(colRef).then(snapshot => {
//   let docs = []
//   snapshot.docs.forEach(doc => {
//     docs.push({ ...doc.data(), id: doc.id })
//   })
//   books.value = docs
// })

const { user } = getUser();
const { documents: books } = getCollection('books')
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


<style>
.home ul {
  padding: 0;
}

.home li {
  list-style-type: none;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
}

.home li .details {
  margin-right: auto;
}

.home li h3 {
  margin: 0;
  margin-bottom: 4px;
}

.home li h3:hover {
  cursor: pointer;
  text-decoration: line-through;
}

.home li p {
  margin: 0;
}

.icon {
  color: #bbbbbb;
  cursor: pointer;
}

.icon.active {
  color: lightcoral;
}
</style>