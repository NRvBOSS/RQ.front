<template>
  <div
    class="min-h-screen flex overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50"
  >
    <!-- Left side - Image/Content -->
    <div
      class="w-1/2 relative transition-all duration-700 ease-in-out"
      :class="{ 'translate-x-full': showLogin }"
    >
      <div class="absolute inset-0 flex items-center justify-center p-12">
        <div class="relative z-10 text-center max-w-md">
          <transition name="fade" mode="out-in">
            <div v-if="!showLogin" key="signup" class="space-y-6">
              <img
                src="../assets/signup-illustration.svg"
                alt="Signup Illustration"
                class="w-72 h-72 mx-auto mb-6 drop-shadow-lg"
              />
              <h3 class="text-3xl font-bold text-gray-800 mb-3">
                Join Our Community
              </h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                Create an account to unlock personalized learning, track your
                progress, and access premium content tailored to your goals.
              </p>
              <div class="flex justify-center space-x-4 mt-6">
                <div class="w-12 h-1 bg-blue-400 rounded-full"></div>
                <div class="w-4 h-1 bg-blue-200 rounded-full"></div>
              </div>
            </div>
            <div v-else key="login" class="space-y-6">
              <img
                src="../assets/exam-illustration.svg"
                alt="Exam Illustration"
                class="w-72 h-72 mx-auto mb-6 drop-shadow-lg"
              />
              <h3 class="text-3xl font-bold text-gray-800 mb-3">
                Welcome Back!
              </h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                Access your personalized dashboard, continue your learning
                journey, and discover new challenges tailored for you.
              </p>
              <div class="flex justify-center space-x-4 mt-6">
                <div class="w-4 h-1 bg-blue-200 rounded-full"></div>
                <div class="w-12 h-1 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </transition>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5"
        ></div>
      </div>
    </div>

    <!-- Right side - Form -->
    <div
      class="w-1/2 relative transition-all duration-700 ease-in-out"
      :class="{ '-translate-x-full': showLogin }"
    >
      <div class="absolute inset-0 flex items-center justify-center p-12">
        <transition name="slide" mode="out-in">
          <div v-if="!showLogin" key="signup-form" class="w-full max-w-md">
            <div class="text-center mb-8">
              <h2 class="text-4xl font-bold text-gray-800 mb-2">Get Started</h2>
              <p class="text-gray-500">Create your free account in seconds</p>
            </div>

            <form @submit.prevent="handleSignup" class="space-y-5">
              <div class="space-y-1">
                <label
                  for="signup-name"
                  class="block text-sm font-medium text-gray-700"
                  >Full Name</label
                >
                <div class="relative">
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    v-model="name"
                    class="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition shadow-sm"
                    required
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-1">
                <label
                  for="signup-email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <div class="relative">
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    v-model="email"
                    class="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition shadow-sm"
                    required
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-1">
                <label
                  for="signup-password"
                  class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <div class="relative">
                  <input
                    id="signup-password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    v-model="password"
                    minlength="6"
                    class="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      v-if="showPassword"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div
                v-if="errorMessage"
                class="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
              >
                {{ errorMessage }}
              </div>

              <button
                type="submit"
                class="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5"
                :disabled="isLoading"
              >
                <svg
                  v-if="isLoading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{{
                  isLoading ? "Creating account..." : "Create Account"
                }}</span>
              </button>
            </form>

            <div class="mt-8 text-center">
              <p class="text-gray-500">
                Already have an account?
                <button
                  @click="toggleForm"
                  class="font-medium text-blue-600 hover:text-blue-800 underline"
                >
                  Sign in
                </button>
              </p>
            </div>

            <div class="mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-else key="login-form" class="w-full max-w-md">
            <div class="text-center mb-8">
              <h2 class="text-4xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p class="text-gray-500">Sign in to continue your journey</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5">
              <div class="space-y-1">
                <label
                  for="login-email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <div class="relative">
                  <input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    v-model="email"
                    class="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition shadow-sm"
                    required
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="space-y-1">
                <label
                  for="login-password"
                  class="block text-sm font-medium text-gray-700"
                  >Password</label
                >
                <div class="relative">
                  <input
                    id="login-password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    v-model="password"
                    class="mt-1 w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 placeholder-gray-400 transition shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      v-if="showPassword"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                <div class="flex justify-end">
                  <a href="#" class="text-sm text-blue-600 hover:text-blue-800"
                    >Forgot password?</a
                  >
                </div>
              </div>

              <div
                v-if="errorMessage"
                class="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
              >
                {{ errorMessage }}
              </div>

              <button
                type="submit"
                class="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5"
                :disabled="isLoading"
              >
                <svg
                  v-if="isLoading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{{ isLoading ? "Signing in..." : "Sign In" }}</span>
              </button>
            </form>

            <div class="mt-8 text-center">
              <p class="text-gray-500">
                Don't have an account?
                <button
                  @click="toggleForm"
                  class="font-medium text-blue-600 hover:text-blue-800 underline"
                >
                  Create one
                </button>
              </p>
            </div>

            <div class="mt-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
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
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const showLogin = ref(false);
const isLoading = ref(false);
const router = useRouter();

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const handleLogin = async () => {
  errorMessage.value = "";

  if (!validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address";
    return;
  }

  if (!validatePassword(password.value)) {
    errorMessage.value = "Password must be at least 6 characters";
    return;
  }

  const userData = {
    email: email.value,
    password: password.value,
  };

  isLoading.value = true;

  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      userData,
      { withCredentials: true }
    );

    if (response.status === 200) {
      toast.success("Login successful!");
      router.push("/main");
    }
  } catch (error) {
    console.error("Error logging in:", error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage.value = "Invalid email or password format";
          break;
        case 401:
          errorMessage.value = "Incorrect email or password";
          break;
        case 404:
          errorMessage.value = "User not found. Please sign up.";
          break;
        default:
          errorMessage.value =
            "An error occurred during login. Please try again.";
      }
    } else {
      errorMessage.value = "Network error. Please check your connection.";
    }
    toast.error(errorMessage.value);
  } finally {
    isLoading.value = false;
  }
};

const handleSignup = async () => {
  errorMessage.value = "";

  if (!name.value.trim()) {
    errorMessage.value = "Please enter your name";
    return;
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address";
    return;
  }

  if (!validatePassword(password.value)) {
    errorMessage.value = "Password must be at least 6 characters";
    return;
  }

  const userData = {
    username: name.value.trim(),
    email: email.value,
    password: password.value,
  };

  isLoading.value = true;

  try {
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      userData,
      { withCredentials: true }
    );

    if (response.status === 201) {
      toast.success("Registration successful! Redirecting...");
      // Automatically log in the user after registration
      router.push("/main");
    }
  } catch (error) {
    console.error("Error registering user:", error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage.value = "Invalid registration data";
          break;
        case 409:
          errorMessage.value = "Email already exists. Please login.";
          break;
        default:
          errorMessage.value = "Registration failed. Please try again.";
      }
    } else {
      errorMessage.value = "Network error. Please check your connection.";
    }
    toast.error(errorMessage.value);
  } finally {
    isLoading.value = false;
  }
};

const toggleForm = () => {
  showLogin.value = !showLogin.value;
  errorMessage.value = "";
  // Clear password field when toggling forms
  password.value = "";
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>
