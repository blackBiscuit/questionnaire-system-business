import { FC, useEffect } from 'react'
import { Form, Input, Checkbox } from 'antd'
import {
  QuestionParagraphPropsType,
  QuestionParagraphChangePropsType
} from './interface'
interface FieldType {
  level: number
  isCenter: boolean
  text: string
}
const { TextArea } = Input
export default ((props) => {
  const { isCenter, text, disabled, onchange } = props
  const [form] = Form.useForm<QuestionParagraphPropsType>()
  const handleValueChange = () => {
    const newQuestionTitle = form.getFieldsValue()
    onchange && onchange(newQuestionTitle)
  }
  useEffect(() => {
    form.setFieldsValue({
      isCenter,
      text
    })
  }, [isCenter, text, form])
  return (
    <Form
      disabled={disabled}
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{
        isCenter,
        text
      }}
    >
      <Form.Item<FieldType>
        name="text"
        label="段落内容"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item<FieldType>
        name="isCenter"
        label="isCenter"
        valuePropName="checked"
      >
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}) as FC<QuestionParagraphChangePropsType>
