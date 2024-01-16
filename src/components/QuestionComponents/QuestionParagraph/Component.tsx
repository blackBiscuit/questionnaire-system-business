import { FC, Fragment } from 'react'
import { Typography } from 'antd'
import { ulid } from 'ulid'
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps
} from './interface'
const { Paragraph } = Typography

export default ((props) => {
  const { text, isCenter } = { ...QuestionParagraphDefaultProps, ...props }
  const textAllList = text.split('\n')

  return (
    <div>
      <Paragraph
        strong
        style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}
      >
        <span>
          {textAllList.map((text, index) => (
            <Fragment key={ulid()}>
              {index > 0 && <br />}
              {text}
            </Fragment>
          ))}
        </span>
      </Paragraph>
    </div>
  )
}) as FC<QuestionParagraphPropsType>
