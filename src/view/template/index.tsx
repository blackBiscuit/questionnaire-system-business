import { FC, useMemo, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsProps } from 'antd'
import { useRequest } from 'ahooks'
import styles from './index.module.scss'
import { getQuestionTemplateServices } from '../../services/question'
import { TemplateKind } from '../../types/question'
import TemplateKinds from './TemplateKinds'
import useLoadQuestionTemplateGroup from '../../hooks/useLoadQuestionTemplateGroup'
export default (() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentType, setCurrentType] = useState('all')
  const { data: questionTemplateGroup } =
    useLoadQuestionTemplateGroup()
  const { data } = useRequest(async () => {
    //templateKind
    const data = await getQuestionTemplateServices<TemplateKind[]>()
    return data
  })
  const templateKinds = useMemo<TabsProps['items']>(() => {
    const Component = <TemplateKinds group={questionTemplateGroup} />
    const defaultTab = [
      {
        key: 'all',
        label: '全部',
        children: Component
      }
    ]
    return data
      ? defaultTab.concat(
          data.map((item) => ({
            key: `${item.id}`,
            label: item.kind,
            children: Component
          }))
        )
      : defaultTab
  }, [data, questionTemplateGroup])
  const handleChange = (key: string) => {
    setSearchParams({
      type: key
    })
  }
  useEffect(() => {
    const type = searchParams.get('type')
    const kind = templateKinds?.find((item) => item.key === type)
    const newCurrentType = kind ? kind.key : 'all'
    setCurrentType(newCurrentType)
  }, [searchParams, templateKinds])
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Tabs
          activeKey={currentType}
          items={templateKinds}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}) as FC
