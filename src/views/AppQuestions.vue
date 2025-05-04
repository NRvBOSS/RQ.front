<template>
  <div v-for="(q, index) in questions" :key="q.id" class="py-4 px-8">
    <p class="font-bold">{{ index + 1 }}. {{ q.text }}</p>
    <div class="grid gap-2">
      <label v-for="option in q.options" class="flex items-center gap-2">
        <input
          type="radio"
          :name="'question-' + q.id"
          :value="option.value"
          v-model="answers[q.id]"
        />
        {{ option.key }} {{ option.value }}
      </label>
    </div>
  </div>
  <div class="flex justify-end p-6">
    <button
      class="bg-green-500 text-white rounded-lg py-5 px-6 cursor-pointer hover:bg-green-600 duration-300"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const questions = ref([]);
const index = ref([]);
const answers = ref([]);

onMounted(async () => {
  console.log("Mounted! Call API...");
  try {
    const response = await axios.get("http://localhost:3000/questions");
    questions.value = response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
});
</script>
