import { FC } from 'react'
import { useRequest } from 'ahooks'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { getEmailCodeServices, userRegisterServices } from '../services/user'
import useDuration from '../hooks/useDuration'
import { LOGIN_PATHNAME } from '../router'
import styles from './Register.module.scss'
import { EMAIL_CODE_DURATION } from '../const'

type FieldType = {
  username?: string
  password?: string
  confirm?: string
  email?: string
  emailCode?: string
}
export default (() => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const key = 'updatable'
  const [getEmailCodeDuration, setGetEmailCodeDuration] = useDuration()
  const { run } = useRequest(
    async (value: FieldType) => {
      const { username, email, password, emailCode } =
        value as Required<FieldType>
      const data = await userRegisterServices({
        username,
        email,
        password,
        emailCode
      })
      return data
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        searchParams.set('email', form.getFieldValue('email'))
        navigate(`${LOGIN_PATHNAME}?${searchParams.toString()}`)
      }
    }
  )
  // const [getEmailCodeDuration, setGetEmailCodeDuration] = useState(0)
  //  const [emailCodeFlag, setEmailCodeFlag] = useState(true)
  const onFinish = (values: FieldType) => {
    console.log('Success:', values)
    run(values)
  }

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: '请求验证码中...'
    })
    setTimeout(async () => {
      try {
        await getEmailCodeServices({ email: form.getFieldValue('email') })
        messageApi.open({
          key,
          type: 'success',
          content: '验证码发送成功',
          duration: 2
        })
      } catch (error) {
        console.log(error)
      }
    }, 1000)
  }

  const handleGetEmailCode = async () => {
    try {
      await form.validateFields(['email'])
      if (getEmailCodeDuration !== 0) return
      // setEmailCodeFlag(false)
      setGetEmailCodeDuration(EMAIL_CODE_DURATION)
      openMessage()
    } catch (error) {
      /* empty */
    }
  }
  // const onFinishFailed = (errorInfo: string) => {
  //   console.log('Failed:', errorInfo)
  // }
  // useEffect(() => {
  //   if (!emailCodeFlag) {
  //     const duration =
  //       getEmailCodeDuration === 0
  //         ? EMAIL_CODE_DURATION
  //         : getEmailCodeDuration - 1
  //     if (duration === EMAIL_CODE_DURATION) {
  //       setGetEmailCodeDuration(duration)
  //     } else {
  //       setTimeout(() => {
  //         setGetEmailCodeDuration(duration)
  //         if (duration === 0) {
  //           setEmailCodeFlag(true)
  //         }
  //       }, 1000)
  //     }
  //   }

  //   console.log(1)
  // }, [emailCodeFlag, getEmailCodeDuration])
  // useEffect(() => {
  //   if (getEmailCodeDuration !== 0) {
  //     const duration = getEmailCodeDuration - 1
  //     setTimeout(() => {
  //       setGetEmailCodeDuration(duration)
  //     }, 1000)
  //   }
  // }, [getEmailCodeDuration])
  return (
    <div className={styles['container-wrapper']}>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.title}>
          {/* <Title level={2}>
            <UserAddOutlined />
          </Title> */}
          <UserAddOutlined />
          <h2>注册新用户</h2>
        </div>
        <div className={styles['register-container']}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={()=>{}}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '请输入你的用户名!' },
                {
                  type: 'string',
                  min: 3,
                  max: 20,
                  message: '用户名长度应该在3-20之间'
                },
                {
                  // pattern: /^\w|[\u4e00-\u9fa5]$/,
                  pattern: /^[\w\u4e00-\u9fa5]+$/,
                  message: '用户名只能由数字字母下划线或中文组成'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="邮箱"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '请输入正确的邮箱'
                },
                { required: true, message: '请输入你的邮箱!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="邮箱验证码">
              <Space>
                <Form.Item
                  noStyle
                  name="emailCode"
                  rules={[{ required: true, message: '请输入你的邮箱验证码!' }]}
                >
                  <Input />
                </Form.Item>
                <Button
                  onClick={handleGetEmailCode}
                  style={{ width: '102px' }}
                  disabled={getEmailCodeDuration !== 0}
                >
                  {getEmailCodeDuration === 0
                    ? '获取验证码'
                    : `${getEmailCodeDuration}s`}
                </Button>
              </Space>
            </Form.Item>
            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入你的密码!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType>
              label="确认密码"
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认你的密码!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('两次密码不一致，请核对后重新输入')
                    )
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <Link to={LOGIN_PATHNAME}>已有账号？去登陆</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}) as FC
