import { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionTextAreaPropsType } from './interface'
const { Paragraph } = Typography
const { TextArea } = Input
export default ((props) => {
  const { title, placeholder } = props
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}) as FC<QuestionTextAreaPropsType>
