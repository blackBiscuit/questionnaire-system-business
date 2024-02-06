import { FC, useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import {
  QuestionComponentType,
  getComponentConfigByType
} from '../../../components/QuestionComponents'
import { getComponentStatServices } from '../../../services/stat'
import { AnswerStat } from '../../../types/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
interface Props {
  selectedComponentId: string
  selectedComponentType: QuestionComponentType | null
}
const { Title } = Typography
export default ((props) => {
  const { id = '' } = useParams()
  const [stat, setStat] = useState<AnswerStat[]>([])
  const { selectedComponentId, selectedComponentType } = props
  const { componentList } = useGetComponentInfo()
  const selectedTitle = useMemo(() => {
    const currentComponent = componentList.find(
      (c) => c.component_id === selectedComponentId
    )
    if (!currentComponent) return ''
    const { title, props } = currentComponent
    const realTitle = (props as { title?: string }).title || title || ''
    return realTitle
  }, [selectedComponentId, componentList])
  const getElement = () => {
    if (!selectedComponentId || !selectedComponentType)
      return <div>未选中组件</div>
    const { StatComponent } =
      getComponentConfigByType(selectedComponentType) || {}
    if (!StatComponent) {
      return <div>该组件无统计图表</div>
    }
    return <StatComponent title={selectedTitle} stat={stat} />
  }
  const { run } = useRequest(
    async (questionId: string, componentId: string) => {
      const data = await getComponentStatServices<{
        stat: AnswerStat[]
      }>(questionId, componentId)
      return data
    },
    {
      manual: true,
      onSuccess({ stat }) {
        setStat(stat)
      }
    }
  )
  useEffect(() => {
    if (id && selectedComponentId) {
      run(id, selectedComponentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComponentId, id])
  return (
    <div
      style={
        {
          //  textAlign: 'center'
        }
      }
    >
      <Title level={3}>图表统计</Title>
      <div>{getElement()}</div>
    </div>
  )
}) as FC<Props>
