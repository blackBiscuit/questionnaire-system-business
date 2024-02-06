import { FC, useRef, useEffect, MouseEvent } from 'react'
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
  //   const getComponent = (component: ComponentConfigUniteProps) => {
  //     const { defaultProps, title } = component
  //     const Component = getAsComponent(component.Component)
  //     const handleClick = () => {
  //       //   const newComponent = {
  //       //     component_id: ulid(),
  //       //     type: component.type,
  //       //     props: defaultProps,
  //       //     title
  //       //   } as QuestionComponent
  //       //   dispatch(addComponent(newComponent))
  //     }
  //     return (
  //       <div className={styles.wrapper} onClick={handleClick}>
  //         <div className={styles.component}>
  //           <Component {...defaultProps} />
  //         </div>
  //       </div>
  //     )
  //   }
  const handleClick = (
    e: MouseEvent,
    id: string,
    type: QuestionComponentType
  ) => {
    e.stopPropagation()
    onSelectedIdAndType && onSelectedIdAndType(id, type)
  }
  useEffect(() => {
    if (selectedComponentId && scrollRef.current) {
      const children = scrollRef.current.children
      const currentChild: HTMLDivElement | undefined =
        Array.prototype.find.call(children, (child: HTMLDivElement) => {
          //child.dataset.selectedId child.getAttribute('data-selected-id')
          const childId = child.dataset.selectedId
          return childId === selectedComponentId
        })
      if (currentChild) {
        scrollRef.current.scrollTo({
          top: currentChild.offsetTop,
          behavior: 'smooth'
        })
      }
    }
  }, [selectedComponentId])
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
