import { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ulid } from 'ulid'
import {
  QuestionCheckPropsType,
  QuestionCheckChangePropsType,
  OptionType
} from './interface'
import { focusNewOption } from '../utils'
interface FieldType {
  title: string
  isVertical: boolean
  list: OptionType[]
}
const wrapperName = `wrapper-${ulid()}`
const optionsName = 'list'
export default ((props) => {
  const { title, list, isVertical, disabled, onchange } = props
  const [form] = Form.useForm<QuestionCheckPropsType>()
  const handleValueChange = () => {
    const newQuestionTitle = form.getFieldsValue()
    onchange && onchange(newQuestionTitle)
  }
  useEffect(() => {
    form.setFieldsValue({
      title,
      list,
      isVertical
    })
  }, [title, list, isVertical, form])
  return (
    <div className={wrapperName}>
      <Form
        disabled={disabled}
        form={form}
        layout="vertical"
        onValuesChange={handleValueChange}
        initialValues={{
          title,
          list,
          isVertical
        }}
      >
        <Form.Item<FieldType>
          name="title"
          label="多选标题"
          rules={[{ required: true, message: '请输入标题内容' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="选项">
          <Form.List name={optionsName}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <Space
                      key={key}
                      style={{ display: 'flex', margin: '0 8px 8px' }}
                      align="baseline"
                    >
                      <Form.Item
                        name={[name, 'checked']}
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '选项内容不能为空' },
                          ({ getFieldValue }) => ({
                            validator(_, text) {
                              const options: OptionType[] =
                                getFieldValue(optionsName)
                              let occurrenceNumber = 0
                              options.forEach((option) => {
                                if (option.text === text) {
                                  occurrenceNumber += 1
                                }
                              })
                              if (occurrenceNumber === 1) {
                                return Promise.resolve()
                              }
                              return Promise.reject(
                                new Error('出现重复选项,选项应保持唯一')
                              )
                            }
                          })
                        ]}
                        style={{
                          marginRight: '5px'
                        }}
                      >
                        <Input
                          //   ref={setRef()}
                          onChange={() => {
                            //name: (3) ['options', 3, 'text'] errors
                            const verifiedErrorsAry = form.getFieldsError()
                            // 表单发生变化时重新校验，已经校验失败的其他表单，解决表单内容不重复时，其他已有重复错误的表单任有错误信息
                            const needValidate = verifiedErrorsAry
                              .filter(
                                (verifiedErrors) =>
                                  verifiedErrors.errors.length > 0
                              )
                              .map((verifiedErrors) => verifiedErrors.name)
                            form.validateFields(needValidate)
                          }}
                          placeholder="选项内容"
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name)
                            fields.forEach(({ name }) => {
                              form.resetFields([optionsName, name, 'text'])
                              setTimeout(() => {
                                //10 set 5
                                // validateFields验证多项在数组中传入多项路径，校验list路径需要再传入一个额外数组 [NameList[],NameList[]]
                                form.validateFields([
                                  [optionsName, name, 'text']
                                ])
                              }, 0)
                            })
                          }}
                        />
                      )}
                    </Space>
                  )
                })}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      const options: OptionType[] =
                        form.getFieldValue(optionsName)
                      const i = options.length + 1
                      add({
                        text: `选项${i}`,
                        value: ulid(),
                        checked: false
                      })
                      setTimeout(() => {
                        focusNewOption(wrapperName)
                      }, 0)
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item<FieldType>
          name="isVertical"
          label="排列方向"
          valuePropName="checked"
        >
          <Checkbox>垂直排列</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}) as FC<QuestionCheckChangePropsType>
