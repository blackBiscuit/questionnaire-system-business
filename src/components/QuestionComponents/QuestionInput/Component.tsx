import { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionInputPropsType } from './interface'
const { Paragraph } = Typography

export default ((props) => {
  const { title, placeholder } = props
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  )
}) as FC<QuestionInputPropsType>
