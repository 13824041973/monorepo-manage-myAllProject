Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "Home" */ '@/vue-views/home.vue')
const About = () => import(/* webpackChunkName: "About" */ '@/vue-views/about.vue')

const routes = [
    { path: "/", component: Home },
    { path: "/about", component: About }
]

const router = new VueRouter({
    routes,
})

export default router