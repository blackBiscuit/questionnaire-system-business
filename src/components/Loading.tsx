import { FC } from 'react'
import { Spin } from 'antd'
interface Props {
  size?: 'small' | 'large' | 'default'
}
export default ((props) => {
  const { size } = props
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size={size ? size : 'large'} />
    </div>
  )
}) as FC<Props>
