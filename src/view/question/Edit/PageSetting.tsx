import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input } from 'antd'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import {
  PageInfoType,
  resetPageInfoReducer
} from '../../../store/pageInfoReducer'
type FieldType = Required<Omit<PageInfoType, 'resetTitle'>>
const { TextArea } = Input
export default (() => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfoData()
  const [form] = Form.useForm()
  const handleValueChange = () => {
    const newPageInfo = form.getFieldsValue()
    dispatch(resetPageInfoReducer(newPageInfo))
  }
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo, form])
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValueChange}
    >
      <Form.Item<FieldType>
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item<FieldType> label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述" />
      </Form.Item>
      <Form.Item<FieldType> label="样式代码" name="css">
        <TextArea placeholder="可输入css样式代码..." />
      </Form.Item>
      <Form.Item<FieldType> label="脚本代码" name="js">
        <TextArea placeholder="可输入js脚本代码..." />
      </Form.Item>
    </Form>
  )
}) as FC
