import { createRouter, createWebHistory } from "vue-router";
// import login from "../views/LoginAndSignin.vue";
import mainPage from "../views/AppMain.vue";
import questionsPage from "../views/AppQuestions.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/login",
    //   component: login,
    // },
    {
      path: "/",
      redirect: "/questionsPage",
    },
    {
      path: "/main",
      component: mainPage,
    },
    {
      path: "/questionsPage",
      component: questionsPage,
    },
  ],
});

export default router;
