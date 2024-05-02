import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreateAccount from "./components/CreateAccount.vue";
import Signup from "./components/Signup.vue";
import Dashboard from "./components/Dashboard.vue";
import ForgotPassword from "./components/ForgotPasword.vue";
import ChangeEmail from "./components/ChangeEmail.vue";
import NotFoundPage from "./components/NotFound.vue";
import { get } from "firebase/database";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/signup",
    },
    {
      path: "/create-account",
      component: CreateAccount,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/change-email",
      component: ChangeEmail,
    },
    {
      path: "/:notFound(.*)",
      component: NotFoundPage,
    },
  ],
});
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const auth = getAuth();
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Please Signin First!!");
      next("/signup");
    }
  } else {
    next();
  }
});
export default router;
