<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-8">
    <!-- Header with welcome message -->
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold text-amber-900 mb-4">
        Welcome, {{ userName || "Quiz Enthusiast" }}!
      </h1>
      <p class="text-xl text-amber-800">
        Test your knowledge with our exciting quizzes
      </p>
    </header>

    <!-- Quiz Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="quiz in quizzes"
        :key="quiz.id"
        @click="openModal(quiz)"
        class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-amber-900">{{ quiz.title }}</h3>
            <span
              class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold"
            >
              {{ quiz.category }}
            </span>
          </div>
          <p class="text-gray-600 mb-6">{{ quiz.description }}</p>
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <svg
                class="w-5 h-5 text-amber-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="text-amber-800 font-medium">{{
                quiz.difficulty
              }}</span>
            </div>
            <span class="text-gray-500 text-sm"
              >{{ quiz.questionCount }} questions</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz Modal -->
    <div
      v-if="selectedQuiz"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div class="bg-amber-600 p-6 rounded-t-2xl">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-3xl font-bold text-white">
                {{ selectedQuiz.title }}
              </h2>
              <p class="text-amber-100 mt-2">{{ selectedQuiz.category }}</p>
            </div>
            <button @click="closeModal" class="text-white hover:text-amber-200">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <div class="mb-8">
            <h3 class="text-xl font-bold text-amber-900 mb-4">
              About This Quiz
            </h3>
            <p class="text-gray-700">{{ selectedQuiz.longDescription }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Quiz Details -->
            <div>
              <h3 class="text-xl font-bold text-amber-900 mb-4">Details</h3>
              <ul class="space-y-3">
                <li class="flex items-center">
                  <svg
                    class="w-5 h-5 text-amber-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Duration: {{ selectedQuiz.duration }} minutes</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-5 h-5 text-amber-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span>Difficulty: {{ selectedQuiz.difficulty }}</span>
                </li>
                <li class="flex items-center">
                  <svg
                    class="w-5 h-5 text-amber-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Questions: {{ selectedQuiz.questionCount }}</span>
                </li>
              </ul>
            </div>

            <!-- User Stats -->
            <div>
              <h3 class="text-xl font-bold text-amber-900 mb-4">
                Your Performance
              </h3>
              <div v-if="userStats" class="bg-amber-50 rounded-lg p-4">
                <div class="flex justify-between mb-2">
                  <span class="font-medium">Best Score:</span>
                  <span class="font-bold">{{ userStats.bestScore }}%</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="font-medium">Attempts:</span>
                  <span class="font-bold">{{ userStats.attempts }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Last Attempt:</span>
                  <span class="font-bold">{{
                    userStats.lastAttempt || "Not attempted"
                  }}</span>
                </div>
              </div>
              <div v-else class="text-gray-500 italic">
                You haven't attempted this quiz yet
              </div>
            </div>
          </div>

          <!-- Leaderboard -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-amber-900 mb-4">
              Top Performers
            </h3>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white rounded-lg overflow-hidden">
                <thead class="bg-amber-600 text-white">
                  <tr>
                    <th class="py-3 px-4 text-left">Rank</th>
                    <th class="py-3 px-4 text-left">User</th>
                    <th class="py-3 px-4 text-left">Score</th>
                    <th class="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-amber-100">
                  <tr
                    v-for="(user, index) in leaderboard"
                    :key="user.id"
                    :class="{ 'bg-amber-50': user.id === currentUserId }"
                  >
                    <td class="py-3 px-4">{{ index + 1 }}</td>
                    <td class="py-3 px-4 font-medium">{{ user.name }}</td>
                    <td class="py-3 px-4">{{ user.score }}%</td>
                    <td class="py-3 px-4">{{ user.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Start Button -->
          <div class="flex justify-center">
            <router-link
              :to="`/questionsPage`"
              class="px-8 py-3 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Start Quiz
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Mock user data - in real app this would come from backend/authentication
const userName = ref("John Doe");
const currentUserId = ref("user123");

// Quiz data - would come from backend in real app
const quizzes = ref([]);
const selectedQuiz = ref(null);
const userStats = ref(null);
const leaderboard = ref([]);

// Mock data for demonstration
const mockQuizzes = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    category: "Programming",
    description: "Test your knowledge of core JavaScript concepts",
    longDescription:
      "This quiz covers fundamental JavaScript concepts including variables, data types, functions, and basic DOM manipulation. Perfect for beginners or those looking to refresh their knowledge.",
    difficulty: "Medium",
    questionCount: 15,
    duration: 20,
  },
  {
    id: "2",
    title: "World Capitals",
    category: "Geography",
    description: "How well do you know world capitals?",
    longDescription:
      "Challenge yourself with this geography quiz that tests your knowledge of world capitals from all continents. Includes flags and fun facts about each country.",
    difficulty: "Easy",
    questionCount: 10,
    duration: 15,
  },
  {
    id: "3",
    title: "Advanced CSS",
    category: "Web Development",
    description: "Flexbox, Grid and modern CSS features",
    longDescription:
      "For CSS enthusiasts! This advanced quiz tests your knowledge of modern CSS features including Flexbox, Grid, animations, transitions, and responsive design techniques.",
    difficulty: "Hard",
    questionCount: 20,
    duration: 30,
  },
];

const mockLeaderboard = [
  { id: "user456", name: "Alice Smith", score: 98, date: "2023-05-15" },
  { id: "user789", name: "Bob Johnson", score: 95, date: "2023-05-14" },
  { id: "user123", name: "John Doe", score: 92, date: "2023-05-10" },
  { id: "user321", name: "Emma Wilson", score: 90, date: "2023-05-12" },
  { id: "user654", name: "Michael Brown", score: 88, date: "2023-05-11" },
];

// Simulate fetching data from backend
onMounted(() => {
  // In a real app, you would use axios/fetch to get this data
  setTimeout(() => {
    quizzes.value = mockQuizzes;
  }, 500);
});

const openModal = (quiz) => {
  selectedQuiz.value = quiz;

  // Simulate fetching user stats and leaderboard for this quiz
  // In a real app, you would make API calls here
  userStats.value = {
    bestScore: Math.floor(Math.random() * 30) + 70,
    attempts: Math.floor(Math.random() * 5) + 1,
    lastAttempt: "2023-05-10",
  };

  leaderboard.value = mockLeaderboard;
};

const closeModal = () => {
  selectedQuiz.value = null;
};
</script>

<style scoped>
/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 8px;
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

/* Animation for modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Animation for quiz cards */
.quiz-card {
  transition: all 0.3s ease;
}
</style>
