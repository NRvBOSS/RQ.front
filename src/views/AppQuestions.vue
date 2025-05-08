<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 pb-20">
    <!-- Header with timer and progress -->
    <div class="sticky top-0 bg-white shadow-md z-50">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <div class="text-xl font-bold text-amber-700">
          Question {{ currentPage * 10 - 9 }}-{{
            Math.min(currentPage * 10, totalQuestions)
          }}
          of {{ totalQuestions }}
        </div>
        <div
          class="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-bold shadow-inner flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Time left: {{ formattedTime }}</span>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="h-2 bg-amber-200 w-full">
        <div
          class="h-full bg-amber-600 transition-all duration-500 ease-out"
          :style="{ width: `${((currentPage * 10) / totalQuestions) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Question List -->
    <div class="container mx-auto px-4 mt-8">
      <div
        v-for="(q, index) in visibleQuestions"
        :key="q.id"
        class="mb-6 p-6 rounded-2xl shadow-sm border border-amber-100 bg-white transition-all hover:shadow-md"
        :class="{
          'border-green-200 bg-green-50':
            submitted && answers[q.id] === q.correct,
          'border-red-200 bg-red-50':
            submitted && answers[q.id] && answers[q.id] !== q.correct,
        }"
      >
        <p class="font-bold text-xl text-gray-800 mb-5">
          <span class="text-amber-600"
            >{{ (currentPage - 1) * 10 + index + 1 }}.</span
          >
          {{ q.text }}
        </p>
        <div class="grid gap-3">
          <label
            v-for="option in q.options"
            class="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-amber-200"
            :class="{
              'border-amber-300 bg-amber-50': answers[q.id] === option.value,
              'border-green-300 bg-green-50':
                submitted && option.value === q.correct,
              'border-red-300 bg-red-50':
                submitted &&
                answers[q.id] === option.value &&
                option.value !== q.correct,
            }"
          >
            <div
              class="flex items-center justify-center h-6 w-6 rounded-full border-2 flex-shrink-0"
              :class="{
                'border-amber-500':
                  answers[q.id] === option.value && !submitted,
                'border-green-500 bg-green-500 text-white':
                  submitted && option.value === q.correct,
                'border-red-500 bg-red-500 text-white':
                  submitted &&
                  answers[q.id] === option.value &&
                  option.value !== q.correct,
                'border-gray-300':
                  !answers[q.id] || answers[q.id] !== option.value,
              }"
            >
              <span
                v-if="
                  (submitted && option.value === q.correct) ||
                  (submitted &&
                    answers[q.id] === option.value &&
                    option.value !== q.correct)
                "
                class="text-xs font-bold"
              >
                {{ option.key }}
              </span>
              <span v-else class="text-xs font-medium text-gray-500">
                {{ option.key }}
              </span>
            </div>
            <span class="font-medium text-gray-700">{{ option.value }}</span>
            <div class="ml-auto">
              <svg
                v-if="submitted && option.value === q.correct"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-if="
                  submitted &&
                  answers[q.id] === option.value &&
                  option.value !== q.correct
                "
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </label>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="flex justify-between mt-10">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="flex items-center gap-2 bg-amber-100 text-amber-800 rounded-xl py-3 px-6 cursor-pointer hover:bg-amber-200 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          Previous
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage * 10 >= totalQuestions"
          class="flex items-center gap-2 bg-amber-600 text-white rounded-xl py-3 px-6 cursor-pointer hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Submit button (only shows on last page) -->
      <div
        v-if="currentPage * 10 >= totalQuestions"
        class="flex justify-center mt-12"
      >
        <button
          @click="checkAnswers"
          class="flex items-center gap-3 bg-green-500 text-white rounded-full py-4 px-8 cursor-pointer hover:bg-green-600 transition text-lg font-bold shadow-lg hover:shadow-xl"
          :disabled="submitted"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          Submit Quiz
        </button>
      </div>

      <!-- Result -->
      <div
        v-if="submitted"
        class="mt-12 p-8 bg-white rounded-2xl shadow-lg border border-amber-100"
      >
        <h2 class="text-3xl font-bold text-center mb-8 text-amber-800">
          Quiz Results
        </h2>
        <div class="flex flex-wrap justify-center gap-8">
          <div class="text-center p-6 bg-green-50 rounded-xl min-w-[180px]">
            <p class="text-5xl font-bold text-green-600">{{ t }}</p>
            <p class="text-gray-600 mt-2">Correct answers</p>
          </div>
          <div class="text-center p-6 bg-red-50 rounded-xl min-w-[180px]">
            <p class="text-5xl font-bold text-red-600">{{ f }}</p>
            <p class="text-gray-600 mt-2">Wrong answers</p>
          </div>
          <div class="text-center p-6 bg-blue-50 rounded-xl min-w-[180px]">
            <p class="text-5xl font-bold text-blue-600">
              {{ Math.round((t / totalQuestions) * 100) }}%
            </p>
            <p class="text-gray-600 mt-2">Score</p>
          </div>
        </div>
        <div class="mt-8 text-center">
          <div
            class="inline-block bg-amber-100 text-amber-800 px-6 py-3 rounded-full font-medium"
          >
            <span v-if="(t / totalQuestions) * 100 >= 80">Excellent! 🎉</span>
            <span v-else-if="(t / totalQuestions) * 100 >= 60"
              >Good job! 👍</span
            >
            <span v-else>Keep practicing! 📚</span>
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #d97706;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b45309;
}
</style>
