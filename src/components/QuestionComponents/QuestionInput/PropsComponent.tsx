import { FC, useEffect } from 'react'
import { Checkbox, Form, Input } from 'antd'
import {
  QuestionInputPropsType,
  QuestionInputChangePropsType
} from './interface'
interface FieldType {
  placeholder: string
  title: string
  required?: boolean
}
export default ((props) => {
  const { placeholder, title, required, disabled, onchange } = props
  const [form] = Form.useForm<QuestionInputPropsType>()
  const handleValueChange = () => {
    const newQuestionInput = form.getFieldsValue()
    onchange && onchange(newQuestionInput)
  }
  useEffect(() => {
    form.setFieldsValue({
      placeholder,
      title,
      required
    })
  }, [placeholder, title, required, form])
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
      <Form.Item<FieldType>
        name="required"
        label="是否必填"
        valuePropName="checked"
      >
        <Checkbox>必填</Checkbox>
      </Form.Item>
    </Form>
  )
}) as FC<QuestionInputChangePropsType>
