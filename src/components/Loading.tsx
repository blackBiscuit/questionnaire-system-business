import { FC } from 'react'
import { Spin } from 'antd'
export default (() => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size="large" />
    </div>
  )
}) as FC
