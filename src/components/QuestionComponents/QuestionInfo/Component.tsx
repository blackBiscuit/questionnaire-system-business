import { FC, Fragment } from 'react'
import { Typography } from 'antd'
import { ulid } from 'ulid'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'
const { Paragraph, Title } = Typography

export default ((props) => {
  const { desc, title } = { ...QuestionInfoDefaultProps, ...props }
  const descAllList = desc.split('\n')

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph strong style={{ marginBottom: '0' }}>
        <span>
          {descAllList.map((desc, index) => (
            <Fragment key={ulid()}>
              {index > 0 && <br />}
              {desc}
            </Fragment>
          ))}
        </span>
      </Paragraph>
    </div>
  )
}) as FC<QuestionInfoPropsType>
