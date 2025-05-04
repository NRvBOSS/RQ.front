import { createRouter, createWebHistory } from "vue-router";
import landingPage from "../views/AppLandingPage.vue";
import questionsPage from "../views/AppQuestions.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: landingPage,
    },
    {
      path: "/questionsPage",
      component: questionsPage,
    },
  ],
});

export default router;
