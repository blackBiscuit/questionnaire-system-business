import { FC, useState } from 'react'
import { Spin } from 'antd'
import { useTitle } from 'ahooks'
import NoPublish from './NoPublish'
import StatHeader from './StatHeader'
import StatLeft from './StatLeft'
import PageStat from './PageStat'
import ChatStat from './ChatStat'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import { QuestionComponentType } from '../../../components/QuestionComponents'
/**
 * {
 * id: 'dada',
 * answerList: [{
 * [id]: 'v1',
 * [id2]: 'v2'
 * }]
 * }
 */
export default (() => {
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfoData()
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] =
    useState<QuestionComponentType | null>(null)
  useTitle(`问卷统计-${title}`)
  if (typeof isPublished === 'boolean' && !isPublished) return <NoPublish />
  const loadingEle = (
    <>
      <div className={styles['left-loading']}>
        <Spin size="large" />
      </div>
      <div className={styles['main-loading']}>
        <Spin size="large" />
      </div>
      <div className={styles['right-loading']}>
        <Spin size="large" />
      </div>
    </>
  )
  const handleSelectedIdAndType = (id: string, type: QuestionComponentType) => {
    setSelectedComponentId(id)
    setSelectedComponentType(type)
  }

  const contentEle = (
    <>
      <div className={styles.left}>
        <StatLeft
          selectedComponentId={selectedComponentId}
          onSelectedIdAndType={handleSelectedIdAndType}
        />
      </div>
      <div className={styles.main} onClick={() => {
      
      }}>
        <PageStat
          selectedComponentId={selectedComponentId}
          onSelectedIdAndType={handleSelectedIdAndType}
        />
      </div>
      <div className={styles.right}>
        <ChatStat
          selectedComponentId={selectedComponentId}
          selectedComponentType={selectedComponentType}
        />
      </div>
    </>
  )
  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          {loading ? loadingEle : contentEle}
        </div>
      </div>
    </div>
  )
}) as FC
