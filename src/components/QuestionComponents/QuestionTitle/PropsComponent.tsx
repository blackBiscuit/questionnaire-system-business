import { FC, useEffect } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import {
  QuestionTitlePropsType,
  QuestionTitleChangePropsType
} from './interface'
interface FieldType {
  level: number
  isCenter: boolean
  text: string
}
export default ((props) => {
  const { level, isCenter, text, disabled, onchange } = props
  const [form] = Form.useForm<QuestionTitlePropsType>()
  const handleValueChange = () => {
    const newQuestionTitle = form.getFieldsValue()
    onchange && onchange(newQuestionTitle)
  }
  useEffect(() => {
    form.setFieldsValue({
      level,
      isCenter,
      text
    })
  }, [level, isCenter, text, form])
  return (
    <Form
      disabled={disabled}
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{
        level,
        isCenter,
        text
      }}
    >
      <Form.Item<FieldType>
        name="text"
        label="文字内容"
        rules={[{ required: true, message: '请输入文字内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType> name="level" label="层级">
        <Select
          options={[
            {
              value: 1,
              label: '1'
            },
            {
              value: 2,
              label: '2'
            },
            {
              value: 3,
              label: '3'
            }
          ]}
        />
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
}) as FC<QuestionTitleChangePropsType>
