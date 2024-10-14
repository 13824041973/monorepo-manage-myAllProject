// import './style/index.css'
// import './style/index.less'
// import aJpg from './assets/xxx.jpg'
// import aaa from './assets/aaa.webp'

// console.log('@css');










/** 
function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done');
        }, 1000);
    })
}

async function main() {
    const result = await test();
    console.log(result);
}

main()
*/





import App from './vue-views/App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount("#root")