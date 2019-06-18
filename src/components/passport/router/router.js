import LoginPwd from '@/components/passport/component/loginPwd'
import Register from '@/components/passport/component/backPwd'
export  const passportRouters = [
  { path: '/passport/login', name: 'LoginPwd', component: LoginPwd},
  { path: '/passport/register', name: 'Register', component: Register}
]
