import { Typography } from 'antd'
import { FC } from 'react'
const { Title, Paragraph } = Typography
interface Props {
  title?: string
  desc?: string
}
export default ((props) => {
  const { title, desc } = props
  return (
    <div>
      <Title level={2} style={{ color: '#fff', fontSize: '26px' }}>
        {title}
      </Title>
      <Paragraph style={{ color: '#fff', fontSize: '14px' }}>{desc}</Paragraph>
    </div>
  )
}) as FC<Props>
