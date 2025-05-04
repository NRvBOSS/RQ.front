<template>
  <div v-for="q in questions" :key="q.id" class="mb-4">
    <p class="font-bold">{{ q.text }}</p>
    <div class="grid gap-2">
      <label v-for="(option, index) in q.options" :key="index" class="flex items-center gap-2">
        <input type="radio" :name="'question-' + q.id" :value="option" />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const questions = ref([])

onMounted(async () => {
  console.log('Mounted! API çağırılır...')
  try {
    const response = await axios.get('http://localhost:3000/questions')
    questions.value = response.data
  } catch (error) {
    console.error('Error fetching questions:', error)
  }
})
</script>
