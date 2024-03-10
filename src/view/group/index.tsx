import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import styles from './index.module.scss'
import { getQuestionGroupItemServices } from '../../services/question'
import { TemplateGroupItem } from '../../types/question'
import QuestionBreadcrumb from './QuestionBreadcrumb'
import QuestionGroupHeader from './QuestionGroupHeader'
import NotGroup from './NotGroup'
import QuestionGroupList from './QuestionGroupList'
export default (() => {
  const { id } = useParams()
  const { data } = useRequest(async () => {
    if (!id || isNaN(Number(id))) return
    const data = await getQuestionGroupItemServices<TemplateGroupItem | null>(
      +id
    )
    return data
  })
  const { title, desc, list } = data || {}
  const getElement = () => {
    if (Object.prototype.toString.call(data) === '[object Null]') {
      return (
        <div className={styles['error-wrapper']}>
          <NotGroup />
        </div>
      )
    }
    return (
      <div className={styles.content}>
        <div className={styles['breadcrumb-wrapper']}>
          <QuestionBreadcrumb title={title} />
        </div>
        <div className={styles.header}>
          <QuestionGroupHeader title={title} desc={desc} />
        </div>
        <div className={styles['list-content']}>
          <QuestionGroupList list={list} />
        </div>
      </div>
    )
  }
  //getQuestionGroupItemServices
  return <div className={styles.container}>{getElement()}</div>
}) as FC
