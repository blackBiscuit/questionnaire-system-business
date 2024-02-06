import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import { changeSelectedId } from '../../../store/componentReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData.ts'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData.ts'
import EditCanvas from './EditCanvas'
import EditHeader from './EditHeader'
import LeftPanel from './LeftPanel.tsx'
import RightPanel from './RightPanel.tsx'
import styles from './index.module.scss'
export default (() => {
  // const { id = '' } = useParams()
  const dispatch = useDispatch()
  const { loading } = useLoadQuestionData()
  const { title } = useGetPageInfoData()
  useTitle(`问卷编辑-${title}`)
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <div>
        <EditHeader />
      </div>
      <div className={styles['container-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}) as FC
