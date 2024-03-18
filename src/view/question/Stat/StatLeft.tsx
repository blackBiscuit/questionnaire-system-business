import { FC, useRef, MouseEvent } from 'react'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './StatLeft.module.scss'
import { ComponentInfoType } from '../../../store/componentReducer'
import {
  QuestionComponentPropsType,
  QuestionComponentType,
  getAsComponent,
  getComponentConfigByType
} from '../../../components/QuestionComponents'
import useScrollToElement from '../../../hooks/useScrollToElement'
interface Props {
  selectedComponentId: string
  onSelectedIdAndType?: (id: string, type: QuestionComponentType) => void
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
  const { componentList } = useGetComponentInfo()
  const { selectedComponentId, onSelectedIdAndType } = props
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleClick = (
    e: MouseEvent,
    id: string,
    type: QuestionComponentType
  ) => {
    e.stopPropagation()
    onSelectedIdAndType && onSelectedIdAndType(id, type)
  }
  useScrollToElement(scrollRef, selectedComponentId)
  return (
    <div
      ref={scrollRef}
      className={classNames('no-scrollbar', styles['stat-left-wrapper'])}
    >
      {componentList.map((component) => {
        return (
          <div
            data-selected-id={component.component_id}
            key={component.component_id}
            className={classNames(componentWrapperClassName, {
              [selectedClassName]: selectedComponentId === component.component_id,
              [lockedClassName]: component.isLocked
            })}
            onClick={(e) => {
              handleClick(e, component.component_id, component.type)
            }}
          >
            <div className={styles.component}>{getComponent(component)}</div>
          </div>
        )
      })}
    </div>
  )
}) as FC<Props>
