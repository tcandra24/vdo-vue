import { createRouter, createWebHistory } from "vue-router";
import cookie from "js-cookie";

const getToken = () => cookie.get("token");

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/",
    redirect: () => {
      const token = getToken();
      if (!token) return { path: "/login" };

      return { path: "/dashboard" };
    },
  },
  {
    path: "/dashboard",
    name: "dashboard.index",
    component: () => import("../views/admin/dashboard/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "users.index",
    component: () => import("../views/admin/users/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/videos",
    name: "videos.index",
    component: () => import("../views/admin/videos/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/videos/create",
    name: "videos.create",
    component: () => import("../views/admin/videos/Create.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/videos/show/:id",
    name: "videos.show",
    component: () => import("../views/admin/videos/Show.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/videos/edit/:id",
    name: "videos.edit",
    component: () => import("../views/admin/videos/Edit.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/categories",
    name: "categories.index",
    component: () => import("../views/admin/categories/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/categories/create",
    name: "categories.create",
    component: () => import("../views/admin/categories/Create.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/categories/edit/:id",
    name: "categories.edit",
    component: () => import("../views/admin/categories/Edit.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = getToken();

  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next({ name: "login" });
  } else if ((to.name === "login" || to.name === "register") && token) {
    next({ name: "dashboard.index" });
  } else {
    next();
  }
});

export default router;
