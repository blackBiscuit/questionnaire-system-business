import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionTemplateItemServices } from '../../services/question'
import { TemplateQuestionInfo } from '../../types/question'
import Loading from '../../components/Loading'
import styles from './index.module.scss'
import QuestionItemBreadcrumb from './QuestionItemBreadcrumb'
import ItemBottom from './ItemBottom'
import QuestionContent from './QuestionContent'
import NoData from './NoData'
export default (() => {
  const { id } = useParams()
  const { data, loading } = useRequest(async () => {
    if (!id || isNaN(Number(id))) return
    const data = await getQuestionTemplateItemServices<TemplateQuestionInfo>(
      +id
    )
    return data
  })
  const getElement = () => {
    if (loading)
      return (
        <div className={styles['loading-wrapper']}>
          <Loading />
        </div>
      )
    if (!data) return <NoData />
    const { componentList, groupId, title, group } = data
    return (
      <>
        <QuestionItemBreadcrumb
          groupId={groupId}
          title={title}
          groupTitle={group.title}
        />
        <QuestionContent componentList={componentList} />
        <ItemBottom groupId={groupId} questionId={Number(id)} />
      </>
    )
  }

  return <div className={styles.container}>{getElement()}</div>
}) as FC
