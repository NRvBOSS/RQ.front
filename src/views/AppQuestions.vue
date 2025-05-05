<template>
  <div>
    
  </div>
  <div v-for="(q, index) in questions" :key="q.id" class="py-4 px-8">
    <p class="font-bold">{{ index + 1 }}. {{ q.text }}</p>
    <div class="grid gap-2">
      <label v-for="option in q.options" class="flex items-center gap-2">
        <input
          class="cursor-pointer"
          type="radio"
          :name="'question-' + q.id"
          :value="option.value"
          v-model="answers[q.id]"
        />
        {{ option.key }} {{ option.value }}
        <div>
          <span
            class="text-green-500 text-3xl"
            v-if="submitted && option.value === q.correct"
            >+</span
          >
          <span
            class="text-3xl text-red-500"
            v-if="
              submitted &&
              option.value === answers[q.id] &&
              option.value !== q.correct
            "
          >
            {{ q.correct }}
          </span>
        </div>
      </label>
    </div>
  </div>
  <div class="flex justify-end p-6">
    <button
      @click="checkAnswers"
      class="bg-green-500 text-white rounded-lg py-5 px-6 cursor-pointer hover:bg-green-600 duration-300"
    >
      Submit
    </button>
  </div>
  <div class="flex gap-10 justify-center text-3xl">
    <p class="text-green-500">Correct answers - {{ t }}</p>
    <p class="text-red-500">Wrong answers - {{ f }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Variables
const questions = ref([]);
const index = ref([]);
const answers = ref({});
const submitted = ref();

const t = ref(0);
const f = ref(0);

onMounted(async () => {
  console.log("Mounted! Call API...");
  try {
    const response = await axios.get("http://localhost:3000/questions");
    questions.value = response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
});

const checkAnswers = () => {
  t.value = 0;
  f.value = 0;
  submitted.value = true;
  questions.value.forEach((q) => {
    if (answers.value[q.id] === q.correct) {
      t.value++;
    } else {
      f.value++;
    }
  });
};
</script>
