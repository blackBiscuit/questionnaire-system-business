import { FC, useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import ComponentProps from './ComponentProps'
import PageSetting from './PageSetting'
import styles from './height.module.scss'
enum TAB_KEYS {
  PROPS = 'props',
  SETTING = 'setting'
}
export default (() => {
  const [activeKey, setActiveKey] = useState<TAB_KEYS>(TAB_KEYS.PROPS)
  const { selectedId } = useGetComponentInfo()
  const itemsAry = [
    {
      key: TAB_KEYS.PROPS,
      label: (
        <span>
          <FileTextOutlined /> 属性
        </span>
      ),
      children: (
        <div className={styles['question-height']}>
          <ComponentProps />
        </div>
      )
    },
    {
      key: TAB_KEYS.SETTING,
      label: (
        <span>
          <SettingOutlined /> 页面设置
        </span>
      ),
      children: (
        <div>
          <PageSetting />
        </div>
      )
    }
  ]
  useEffect(() => {
    const tabKey = selectedId ? TAB_KEYS.PROPS : TAB_KEYS.SETTING
    setActiveKey(tabKey)
  }, [selectedId])
  return (
    <div>
      <Tabs
        onTabClick={(key) => {
          setActiveKey(key as TAB_KEYS)
        }}
        activeKey={activeKey}
        items={itemsAry}
      />
    </div>
  )
}) as FC
