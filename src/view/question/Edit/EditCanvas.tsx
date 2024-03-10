import { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Spin, message } from 'antd'
import classNames from 'classnames'
import {
  changeSelectedId,
  insertComponentReducer,
  moveComponentReducer
} from '../../../store/componentReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  QuestionComponentPropsType,
  getComponentConfigByType,
  getAsComponent
} from '../../../components/QuestionComponents'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './EditCanvas.module.scss'
import { ComponentInfoType } from '../../../store/componentReducer'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import useDownShift from '../../../hooks/useDownShift'
interface Props {
  loading?: boolean
}
const componentWrapperClassName = styles['component-wrapper']
const selectedClassName = styles.selected
const lockedClassName = styles.locked
const getComponent = (componentInfo: ComponentInfoType) => {
  const { type, props = {} } = componentInfo
  const componentConfig = getComponentConfigByType(type)
  if (componentConfig) {
    const { defaultProps, Component: C } = componentConfig
    const componentProps = {
      ...defaultProps,
      ...props
    } as QuestionComponentPropsType
    const Component = getAsComponent(C)
    return <Component {...componentProps} />
  }
  return null
}
export default ((props) => {
  const dispatch = useDispatch()
  const downShift = useDownShift()
  const { loading } = props
  const { componentList, selectedId } = useGetComponentInfo()
  useBindCanvasKeyPress()
  const handleClick = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  if (loading) {
    return (
      <div className={styles['canvas-loading']}>
        <Spin size="large" />
      </div>
    )
  }
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.component_id }
  })
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    if (componentList[oldIndex].isLocked || componentList[newIndex].isLocked) {
      message.info('不能选中锁定的组件')
      return
    }
    if (downShift) {
      dispatch(insertComponentReducer({ oldIndex, newIndex }))
      return
    }
    dispatch(moveComponentReducer({ oldIndex, newIndex }))
  }
  return (
    <div className={styles['canvas-content']}>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList
          .filter((component) => !component.isHidden)
          .map((component) => {
            return (
              <SortableItem
                key={component.component_id}
                id={component.component_id}
              >
                <div
                  className={classNames(componentWrapperClassName, {
                    [selectedClassName]: selectedId === component.component_id,
                    [lockedClassName]: component.isLocked
                  })}
                  onClick={(e) => {
                    handleClick(e, component.component_id)
                  }}
                >
                  <div className={styles.component}>
                    {getComponent(component)}
                  </div>
                </div>
              </SortableItem>
            )
          })}
      </SortableContainer>
    </div>
  )
}) as FC<Props>
