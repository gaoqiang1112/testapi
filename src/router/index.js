import Vue from 'vue'
import Router from 'vue-router'

import {passportRouters} from '@/components/passport/router/router.js'


Vue.use(Router)

const router = [
  { path: '*', name: '404',redirect:'/'},

]
const routers=router.concat(passportRouters)
export default new Router({
  mode:'history',
  routes: routers
})
