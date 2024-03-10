import { Breadcrumb } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './QuestionItemBreadcrumb.module.scss'
interface Props {
  groupTitle?: string
  title?: string
  groupId: number
}
export default ((props) => {
  const { groupTitle = '当前问卷组', title = '当前问卷', groupId } = props
  return (
    <div className={styles['breadcrumb-wrapper']}>
      <Breadcrumb
        items={[
          {
            title: <Link to="/home">首页</Link>
          },
          {
            title: <Link to="/template">问卷调查模板</Link>
          },
          {
            title: <Link to={`/group/${groupId}`}>{groupTitle}</Link>
          },
          {
            title
          }
        ]}
      />
    </div>
  )
}) as FC<Props>
