import WhiteBar from '@/components/main/component/whiteBar'
import Bill from '@/components/main/component/bill'
import My from '@/components/main/component/my'
import Main from '@/components/main/main'

export  const mainRouters = [
  { path:'/', component:Main,redirect:'/main/WhiteBar',children:[
      { path: '/main/WhiteBar', name: 'WhiteBar', component: WhiteBar,meta:{require:false}},
      { path: '/main/Bill', name: 'Bill', component: Bill,meta:{require:false}},
      { path: '/main/My', name: 'My', component: My,meta:{require:true}}
    ]},

]
