import { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from './interface'
const { Paragraph } = Typography
export default ((props) => {
  const { title, options, isVertical, value } = {
    ...QuestionRadioDefaultProps,
    ...props
  }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}) as FC<QuestionRadioPropsType>
