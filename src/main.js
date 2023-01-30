import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '../public/global.css'
import animation from '../public/animation.css'
import * as ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(global)
Vue.use(animation)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
