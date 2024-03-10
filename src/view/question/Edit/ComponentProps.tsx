import { FC } from 'react'
import { useDispatch } from 'react-redux'
import NotComponentProps from './NotComponentProps'
import {
  getComponentConfigByType,
  getAsComponent,
  QuestionComponentPropsType,
  QuestionComponentChangePropsType
} from '../../../components/QuestionComponents'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeComponentReducer } from '../../../store/componentReducer'
export default (() => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent) return <NotComponentProps />
  const { type, props, component_id, isLocked } = selectedComponent
  const componentConfig = getComponentConfigByType(type)
  if (!componentConfig) return <NotComponentProps />
  const PropsComponent = getAsComponent<QuestionComponentChangePropsType>(
    componentConfig.PropsComponent
  )
  const handleChange = (questionProps: QuestionComponentPropsType) => {
    const newQuestionProps = {
      id: component_id,
      props: questionProps
    }
    dispatch(changeComponentReducer(newQuestionProps))
  }
  const { defaultProps } = componentConfig
  return (
    <PropsComponent
      {...{
        ...defaultProps,
        ...props
      }}
      onchange={handleChange}
      disabled={isLocked}
    />
  )
}) as FC
