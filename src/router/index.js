import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Index from "@/views/Index";
import Trend from "@/views/Trend";
import Write from "@/views/Write";
import ArticleDetail from "@/views/ArticleDetail";
import Profile from "@/views/Profile";
import SearchDetail from "@/views/SearchDetail";
import BackstageIndex from "@/admin/views/BackstageIndex.vue";
import SortDetail from "@/views/SortDetail.vue";
import DashBoard from "@/admin/views/DashBoard.vue";
import ArticleManage from "@/admin/views/ArticleManage.vue";
import UserManage from "@/admin/views/UserManage.vue";
import AdvertisingManage from "@/admin/views/AdvertisingManage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import Home from "@/views/Home.vue";



const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/',
        name: 'index',
        component: Index,
        children: [
            {
                path: '/home',
                component: Home
            },
            {
                path: '/trend',
                name: 'trend',
                component: Trend
            },
            {
                path: '/write',
                name: 'write',  // 修正：原来是'trend'，应该是'write'
                component: Write
            },
            {
                path: '/detail',
                name: 'detail',
                component: ArticleDetail
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            },
            {
                path: '/search',
                name: 'search',
                component: SearchDetail
            },
            {
                path: '/detail/sort',
                name: 'detail/sort',
                component: SortDetail
            }
        ]
    },
    {
        path: '/admin',
        component: BackstageIndex,
        meta: { requiresRole: true, role: 'admin' },
        children: [
            {
                path: 'article',
                component: ArticleManage
            },
            {
                path: 'user',
                component: UserManage
            },
            {
                path: 'ad',
                component: AdvertisingManage
            },
            {
                path: 'board',
                component: DashBoard
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

//路由守卫
router.beforeEach((to, from, next) => {
    // 通过 VueCookies 获取用户角色
    const role = VueCookies.get('role') || null;
        
    if (to.matched.length === 0){
        next({name: 'NotFound'})
    }
    else {
        if (to.meta.requiresRole){
            if (to.meta.role === role){
                next();
            }else {
                next({path:'/login'})
            }
        }else {
            next();
        }
    }
})


export default router
