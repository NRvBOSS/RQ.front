<template>
  <div class="min-h-screen flex overflow-hidden">
    <!-- Left side - Image/Content -->
    <div
      class="w-1/2 relative transition-all duration-700 ease-in-out"
      :class="{ 'translate-x-full': showLogin }"
    >
      <div
        class="absolute inset-0 bg-gray-50 flex items-center justify-center p-12"
      >
        <div class="relative z-10 text-center max-w-md">
          <transition name="fade" mode="out-in">
            <div v-if="!showLogin" key="signup">
              <img
                src="../assets/signup-illustration.svg"
                alt="Signup Illustration"
                class="w-64 h-64 mx-auto mb-8"
              />
              <h3 class="text-2xl font-bold text-gray-800 mb-2">
                Join Our Community
              </h3>
              <p class="text-gray-600">
                Create an account to save your progress, track your performance,
                and access premium content.
              </p>
            </div>
            <div v-else key="login">
              <img
                src="../assets/exam-illustration.svg"
                alt="Exam Illustration"
                class="w-64 h-64 mx-auto mb-8"
              />
              <h3 class="text-2xl font-bold text-gray-800 mb-2">
                Exam Preparation Platform
              </h3>
              <p class="text-gray-600">
                Access thousands of practice questions, track your progress, and
                improve your scores.
              </p>
            </div>
          </transition>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10"
        ></div>
      </div>
    </div>

    <!-- Right side - Form -->
    <div
      class="w-1/2 relative transition-all duration-700 ease-in-out"
      :class="{ '-translate-x-full': showLogin }"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-12"
      >
        <transition name="slide" mode="out-in">
          <div v-if="!showLogin" key="signup-form" class="w-full max-w-md">
            <h2 class="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p class="text-blue-100 mb-8">Get started with your free account</p>

            <form @submit.prevent="handleSignup" class="space-y-6">
              <div>
                <label
                  for="signup-name"
                  class="block text-sm font-medium text-blue-100"
                  >Full Name</label
                >
                <input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  v-model="name"
                  class="mt-1 w-full px-4 py-3 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-blue-200 transition"
                  required
                />
              </div>

              <div>
                <label
                  for="signup-email"
                  class="block text-sm font-medium text-blue-100"
                  >Email</label
                >
                <input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  v-model="email"
                  class="mt-1 w-full px-4 py-3 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-blue-200 transition"
                  required
                />
              </div>

              <div>
                <label
                  for="signup-password"
                  class="block text-sm font-medium text-blue-100"
                  >Password</label
                >
                <input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  v-model="password"
                  class="mt-1 w-full px-4 py-3 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-blue-200 transition"
                  required
                />
              </div>

              <div class="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  required
                />
                <label for="terms" class="ml-2 block text-sm text-blue-100">
                  I agree to the
                  <a href="#" class="text-white hover:text-blue-50 underline"
                    >Terms</a
                  >
                  and
                  <a href="#" class="text-white hover:text-blue-50 underline"
                    >Privacy Policy</a
                  >
                </label>
              </div>

              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
              >
                Create Account
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-blue-100">
                Already have an account?
                <button
                  @click="toggleForm"
                  class="font-medium text-white hover:text-blue-50 underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
          <div v-else key="login-form" class="w-full max-w-md">
            <h2 class="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p class="text-blue-100 mb-8">Login to access your account</p>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <div>
                <label
                  for="login-email"
                  class="block text-sm font-medium text-blue-100"
                  >Email</label
                >
                <input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  v-model="email"
                  class="mt-1 w-full px-4 py-3 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-blue-200 transition"
                  required
                />
              </div>

              <div>
                <label
                  for="login-password"
                  class="block text-sm font-medium text-blue-100"
                  >Password</label
                >
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  v-model="password"
                  class="mt-1 w-full px-4 py-3 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-blue-200 transition"
                  required
                />
              </div>

              <div class="flex items-center justify-between"></div>

              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
              >
                Login
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-blue-100">
                Don't have an account?
                <button
                  @click="toggleForm"
                  class="font-medium text-white hover:text-blue-50 underline"
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const showLogin = ref(false);
const router = useRouter();

const handleSignup = () => {
  router.push("/landing");
};

const toggleForm = () => {
  showLogin.value = !showLogin.value;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.transition-all {
  transition-property: all;
}
</style>
