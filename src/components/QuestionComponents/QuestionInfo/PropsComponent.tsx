import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType, QuestionInfoChangePropsType } from './interface'
interface FieldType {
  title: string
  desc: string
}
const { TextArea } = Input
export default ((props) => {
  const { title, desc, disabled, onchange } = props
  const [form] = Form.useForm<QuestionInfoPropsType>()
  const handleValueChange = () => {
    const newQuestionTitle = form.getFieldsValue()
    onchange && onchange(newQuestionTitle)
  }
  useEffect(() => {
    form.setFieldsValue({
      title,
      desc
    })
  }, [title, desc, form])
  return (
    <Form
      disabled={disabled}
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{
        title,
        desc
      }}
    >
      <Form.Item<FieldType>
        name="title"
        label="标题"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType> name="desc" label="描述" >
        <TextArea />
      </Form.Item>
    </Form>
  )
}) as FC<QuestionInfoChangePropsType>
