import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/lsperson',
    component: Layout,
	redirect: '/example/table',
    name: 'Example',
    meta: { title: '监所人员管理', icon: 'example' },
    children: [
       {
        path: 'index',
        name: '查看人员 ',
        component: () => import('@/views/lsperson/index'),
        meta: { title: '查看人员', icon: 'form' }
      },
			 {
			  path: 'addPerson',
			  name: '添加人员 ',
			  component: () => import('@/views/lsperson/addPerson'),
			  meta: { title: '添加人员', icon: 'form' }
			},
			 {
			  path: 'lsrecord',
			  name: '比对记录 ',
			  component: () => import('@/views/lsperson/lsrecord'),
			  meta: { title: '比对记录', icon: 'form' }
			},
    ]
  },
  {
    path: '/ljdevice',
    component: Layout,
	redirect: '/example/table',
    name: 'Example',
    meta: { title: '设备管理', icon: 'example' },
    children: [
       {
        path: 'index',
        name: '查看设备 ',
        component: () => import('@/views/ljdevice/index'),
        meta: { title: '查看设备', icon: 'device' }
      },
    ]
  },
 

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
