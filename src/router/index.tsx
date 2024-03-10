import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import ManageLayout from '../layout/ManageLayout'
import QuestionLayout from '../layout/QuestionLayout'
import Home from '../view/Home'
import Login from '../view/Login'
import Register from '../view/Register'
import NotFount from '../view/NotFount'
import Lists from '../view/manage/Lists'
import Star from '../view/manage/Star'
import Trash from '../view/manage/Trash'
import Edit from '../view/question/Edit'
import Stat from '../view/question/Stat'
import Template from '../view/template'
import Group from '../view/group'
import QuestionTemplateItem from '../view/questionTemplateItem'
import Forget from '../view/Forget'
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forget',
        element: <Forget />
      },
      {
        path: '/manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <Lists />
          },
          {
            path: 'star',
            element: <Star />
          },
          {
            path: 'trash',
            element: <Trash />
          }
        ]
      },
      {
        path: '/template',
        element: <Template />
      },
      {
        path: '/group/:id',
        element: <Group />
      },
      {
        path: '/question/template/:id',
        element: <QuestionTemplateItem />
      },
      {
        path: '*',
        element: <NotFount />
      }
    ]
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      {
        path: '/question',
        element: <Navigate to="/question/edit" />
      },
      {
        path: 'edit/:id',
        element: <Edit />,
        index: true
      },
      {
        path: 'stat/:id',
        element: <Stat />
      }
    ]
  }
])
export default router
export const LOGIN_PATHNAME = '/login'
export const HOME_PATHNAME = '/home'
export const REGISTER_PATHNAME = '/register'
export const FORGET_PATHNAME = '/forget'
export const MANAGE_LIST_PATHNAME = '/manage/list'
export const QUESTION_STAT = '/question/stat'
export const QUESTION_EDIT = '/question/edit'
export const NO_LOGIN_LIST = [LOGIN_PATHNAME, REGISTER_PATHNAME]
export const isLoginOrRegister = (pathname: string) => {
  const NO_LOGIN_LIST = [LOGIN_PATHNAME, REGISTER_PATHNAME]
  return NO_LOGIN_LIST.includes(pathname) ? true : false
}
const noNeedUserInfoAry = [
  LOGIN_PATHNAME,
  HOME_PATHNAME,
  REGISTER_PATHNAME,
  FORGET_PATHNAME
]
export const isNoNeedUserInfo = (pathname: string) =>
  noNeedUserInfoAry.includes(pathname) ? true : false
