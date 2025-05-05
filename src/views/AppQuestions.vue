<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header with timer and progress -->
    <div class="sticky top-0 bg-white shadow-md z-50">
      <div
        class="container mx-auto px-4 py-3 flex justify-between items-center"
      >
        <div class="text-xl font-bold text-blue-600">
          Question {{ currentPage * 10 - 9 }}-{{
            Math.min(currentPage * 10, totalQuestions)
          }}
          of {{ totalQuestions }}
        </div>
        <div
          class="bg-blue-100 px-4 py-2 rounded-full text-blue-800 font-bold shadow-inner"
        >
          ⏱️ Time left: {{ formattedTime }}
        </div>
      </div>

      <!-- Progress bar -->
      <div class="h-2 bg-gray-200 w-full">
        <div
          class="h-full bg-blue-500 transition-all duration-300"
          :style="{ width: `${((currentPage * 10) / totalQuestions) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Question List -->
    <div class="container mx-auto px-4 mt-6">
      <div
        v-for="(q, index) in visibleQuestions"
        :key="q.id"
        class="mb-8 p-6 rounded-xl shadow-sm border border-gray-200 bg-white transition-all hover:shadow-md"
        :class="{
          'border-green-200 bg-green-50':
            submitted && answers[q.id] === q.correct,
          'border-red-200 bg-red-50':
            submitted && answers[q.id] && answers[q.id] !== q.correct,
        }"
      >
        <p class="font-bold text-lg text-gray-800 mb-4">
          <span class="text-blue-600"
            >{{ (currentPage - 1) * 10 + index + 1 }}.</span
          >
          {{ q.text }}
        </p>
        <div class="grid gap-3">
          <label
            v-for="option in q.options"
            class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
            :class="{
              'bg-blue-100': answers[q.id] === option.value,
              'bg-green-100': submitted && option.value === q.correct,
              'bg-red-100':
                submitted &&
                answers[q.id] === option.value &&
                option.value !== q.correct,
            }"
          >
            <input
              class="cursor-pointer h-5 w-5 text-blue-600"
              type="radio"
              :name="'question-' + q.id"
              :value="option.value"
              v-model="answers[q.id]"
              :disabled="submitted"
            />
            <span class="font-medium"
              >{{ option.key }}. {{ option.value }}</span
            >
            <div class="ml-auto">
              <span
                class="text-green-500 text-2xl"
                v-if="submitted && option.value === q.correct"
                >✓</span
              >
              <span
                class="text-2xl text-red-500"
                v-if="
                  submitted &&
                  answers[q.id] === option.value &&
                  option.value !== q.correct
                "
              >
                ✗
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="flex justify-between mt-8">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="bg-gray-200 text-gray-700 rounded-lg py-3 px-6 cursor-pointer hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage * 10 >= totalQuestions"
          class="bg-blue-500 text-white rounded-lg py-3 px-6 cursor-pointer hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <!-- Submit button (only shows on last page) -->
      <div
        v-if="currentPage * 10 >= totalQuestions"
        class="flex justify-center mt-10"
      >
        <button
          @click="checkAnswers"
          class="bg-green-500 text-white rounded-full py-4 px-8 cursor-pointer hover:bg-green-600 transition text-lg font-bold shadow-lg"
          :disabled="submitted"
        >
          Submit Quiz
        </button>
      </div>

      <!-- Result -->
      <div
        v-if="submitted"
        class="mt-12 p-6 bg-white rounded-xl shadow-md border border-gray-200"
      >
        <h2 class="text-2xl font-bold text-center mb-6">Quiz Results</h2>
        <div class="flex justify-center gap-12">
          <div class="text-center">
            <p class="text-4xl font-bold text-green-500">{{ t }}</p>
            <p class="text-gray-600">Correct answers</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-red-500">{{ f }}</p>
            <p class="text-gray-600">Wrong answers</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-blue-500">
              {{ Math.round((t / totalQuestions) * 100) }}%
            </p>
            <p class="text-gray-600">Score</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

// States
const questions = ref([]);
const answers = ref({});
const submitted = ref(false);
const timeLeft = ref(3600);
const t = ref(0);
const f = ref(0);
const currentPage = ref(1);
const questionsPerPage = 10;

// Computed properties
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
});

const totalQuestions = computed(() => questions.value.length);
const visibleQuestions = computed(() => {
  const start = (currentPage.value - 1) * questionsPerPage;
  const end = start + questionsPerPage;
  return questions.value.slice(start, end);
});

// API and timer
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/questions");
    questions.value = response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }

  // Timer start
  const intervalId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(intervalId);
      if (!submitted.value) {
        checkAnswers();
      }
    }
  }, 1000);
});

// Pagination
const nextPage = () => {
  if (currentPage.value * questionsPerPage < totalQuestions.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Check answers
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

<style>
/* Smooth transitions for hover effects */
.transition {
  transition: all 0.3s ease;
}

/* Custom radio buttons */
input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 50%;
  outline: none;
}

input[type="radio"]:checked {
  border-color: #3b82f6;
  background-color: #3b82f6;
  background-image: radial-gradient(circle, white 35%, transparent 40%);
}
</style>
