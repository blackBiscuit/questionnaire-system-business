import { FC } from 'react'
import { Typography, Checkbox, Space } from 'antd'
import { QuestionCheckPropsType, QuestionCheckDefaultProps } from './interface'
const { Paragraph } = Typography
export default ((props) => {
  const { title, list, isVertical } = {
    ...QuestionCheckDefaultProps,
    ...props
  }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(({ text, value, checked }) => (
          <Checkbox checked={checked} key={value}>
            {text}
          </Checkbox>
        ))}
      </Space>
    </div>
  )
}) as FC<QuestionCheckPropsType>
