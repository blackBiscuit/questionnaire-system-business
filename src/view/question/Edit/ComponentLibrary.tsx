import { FC } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { ulid } from 'ulid'
import {
  componentConfigGroup,
  ComponentConfigUniteProps,
  getAsComponent,
  QuestionComponent
} from '../../../components/QuestionComponents'
import { addComponent } from '../../../store/componentReducer'
import styles from './ComponentLibrary.module.scss'
const { Title } = Typography

export default (() => {
  const dispatch = useDispatch()
  const getComponent = (component: ComponentConfigUniteProps) => {
    const { defaultProps, title } = component
    const Component = getAsComponent(component.Component)
    const handleClick = () => {
      const newComponent = {
        component_id: ulid(),
        type: component.type,
        props: defaultProps,
        title
      } as QuestionComponent
      dispatch(addComponent(newComponent))
    }
    return (
      <div className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component {...defaultProps} />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfigGroup.map((group, i) => {
        const { type, groupName, componentList } = group
        return (
          <div key={type}>
            <Title
              level={3}
              style={{ fontSize: '16px', marginTop: i > 0 ? '20px' : '0' }}
            >
              {groupName}
            </Title>

            {componentList.map((component) => {
              const { type } = component
              return <div key={type}>{getComponent(component)}</div>
            })}
          </div>
        )
      })}
    </>
  )
}) as FC
