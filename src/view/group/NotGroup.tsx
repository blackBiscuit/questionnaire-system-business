import { Button, Result } from 'antd'
import { FC } from 'react'
export default (() => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，当前问卷组不存在"
        extra={<Button type="primary">返回</Button>}
      />
    </div>
  )
}) as FC
