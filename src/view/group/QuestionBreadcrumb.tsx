
import { Breadcrumb } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
interface Props {
  title?: string
}
export default ((props) => {
  const { title } = props
  return (
    <Breadcrumb
      items={[
        {
          title: <Link to="/home">首页</Link>
        },
        {
          title: <Link to="/template">问卷调查模板</Link>
        },
        {
          title: title || '当前问卷组'
        }
      ]}
    />
  )
}) as FC<Props>
