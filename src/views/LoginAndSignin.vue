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

              <div class="relative">
                <label
                  for="signup-password"
                  class="block text-sm font-medium text-blue-100"
                  >Password</label
                >
                <input
                  id="signup-password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  v-model="password"
                  minlength="6"
                  class="mt-1 w-full px-4 py-3 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-blue-200 transition"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-10 text-blue-100 hover:text-white"
                >
                  <span v-if="showPassword">Hide</span>
                  <span v-else>Show</span>
                </button>
              </div>

              <div v-if="errorMessage" class="text-red-300 text-sm">
                {{ errorMessage }}
              </div>

              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
                :disabled="isLoading"
              >
                <span v-if="isLoading">Processing...</span>
                <span v-else>Create Account</span>
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

              <div class="relative">
                <label
                  for="login-password"
                  class="block text-sm font-medium text-blue-100"
                  >Password</label
                >
                <input
                  id="login-password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  v-model="password"
                  class="mt-1 w-full px-4 py-3 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-300 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 text-white placeholder-blue-200 transition"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-10 text-blue-100 hover:text-white"
                >
                  <span v-if="showPassword">Hide</span>
                  <span v-else>Show</span>
                </button>
              </div>

              <div v-if="errorMessage" class="text-red-300 text-sm">
                {{ errorMessage }}
              </div>

              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition"
                :disabled="isLoading"
              >
                <span v-if="isLoading">Processing...</span>
                <span v-else>Login</span>
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
