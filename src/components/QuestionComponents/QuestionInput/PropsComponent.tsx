import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import {
  QuestionInputPropsType,
  QuestionInputChangePropsType
} from './interface'
interface FieldType {
  placeholder: string
  title: string
}
export default ((props) => {
  const { placeholder, title, disabled, onchange } = props
  const [form] = Form.useForm<QuestionInputPropsType>()
  const handleValueChange = () => {
    const newQuestionInput = form.getFieldsValue()
    onchange && onchange(newQuestionInput)
  }
  useEffect(() => {
    form.setFieldsValue({
      placeholder,
      title
    })
  }, [placeholder, title, form])
  return (
    <Form
      disabled={disabled}
      onValuesChange={handleValueChange}
      form={form}
      layout="vertical"
      initialValues={{
        placeholder,
        title
      }}
    >
      <Form.Item<FieldType>
        name="title"
        label="标题"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType> name="placeholder" label="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}) as FC<QuestionInputChangePropsType>
