import { FC } from 'react'
import { Rate, Typography, Space } from 'antd'
import { QuestionRatePropsType, QuestionRateDefaultProps } from './interface'
const { Paragraph } = Typography
export default ((props) => {
  const { title, rates } = {
    ...QuestionRateDefaultProps,
    ...props
  }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction="vertical">
        {rates.map((rate) => (
          <Space key={rate.key} style={{}}>
            <span style={{ marginRight: '5px' }}>{rate.text}</span>
            <Rate value={rate.value} />
          </Space>
        ))}
      </Space>
    </div>
  )
}) as FC<QuestionRatePropsType>
