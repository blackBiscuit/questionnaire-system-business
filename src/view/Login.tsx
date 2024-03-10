import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import { LockOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { FORGET_PATHNAME, MANAGE_LIST_PATHNAME, REGISTER_PATHNAME } from '../router'
import styles from './Login.module.scss'
import { userLoginServices } from '../services/user'
import { LoginParams, LoginResponse } from '../types/user'
import { setToken } from '../utils/userInfo'
import { loginReducer } from '../store/userReducer'

type FieldType = {
  password?: string
  email?: string
  remember?: boolean
}
const USER_EMAIL = 'email'
const USER_PASSWORD = 'password'
const rememberUser = (email: string, password: string) => {
  localStorage.setItem(USER_EMAIL, email)
  localStorage.setItem(USER_PASSWORD, password)
}
const forgetUser = () => {
  localStorage.removeItem(USER_EMAIL)
  localStorage.removeItem(USER_PASSWORD)
}
const getUserInfo = () => {
  return {
    email: localStorage.getItem(USER_EMAIL),
    password: localStorage.getItem(USER_PASSWORD)
  }
}
export default (() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const { run, loading } = useRequest(
    async (value: LoginParams) => {
      return await userLoginServices<LoginResponse>(value)
    },
    {
      manual: true,
      onSuccess(data) {
        const { username, email } = data.userInfo
        setToken(data.token)
        dispatch(
          loginReducer({
            email,
            username
          })
        )
        message.success(`欢迎回来😊,${username}`)
        navigate(MANAGE_LIST_PATHNAME)
      }
      // onError() {}
    }
  )
  const _email = searchParams.get('email')
  const onFinish = (values: FieldType) => {
    const { email, password, remember } = values || {}
    if (remember) {
      rememberUser(email!, password!)
    } else {
      forgetUser()
    }
    if (email && password) {
      run({
        email,
        password
      })
    }
  }

  useEffect(() => {
    if (_email) return
    const userInfo = getUserInfo()
    if (userInfo.email && userInfo.password) {
      form.setFieldsValue({
        ...userInfo
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_email])
  return (
    <div className={styles['container-wrapper']}>
      <div className={styles.container}>
        <div className={styles.title}>
          <UserAddOutlined />
          <h2>用户登录</h2>
        </div>
        <div className={styles['login-container']}></div>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true, email: searchParams.get('email') }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            name="email"
            rules={[
              { required: true, message: '请输入你的用户邮箱' },
              {
                type: 'email',
                message: '请输入正确的邮箱'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户邮箱"
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password
              placeholder="密码"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item<FieldType>>
            <div className={styles['user-help-container']}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <Link to={FORGET_PATHNAME}>忘记密码</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              disabled={loading}
              style={{
                width: '100%'
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            或者 <Link to={REGISTER_PATHNAME}>去注册</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}) as FC
