import { FC } from 'react'
import styles from './QuestionContent.module.scss'
import { QuestionComponent, QuestionComponentPropsType, getAsComponent, getComponentConfigByType } from '../../components/QuestionComponents'
import { ComponentInfoType } from '../../store/componentReducer'
interface Props {
  componentList: QuestionComponent[]
}
export default ((props) => {
  const { componentList } = props
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
  return (
    <div className={styles['question-wrapper']}>
      <div className={styles.content}>
        {componentList.map((component) => (
          <div className={styles.component} key={component.component_id}>
            {getComponent(component)}
          </div>
        ))}
      </div>
    </div>
  )
}) as FC<Props>
