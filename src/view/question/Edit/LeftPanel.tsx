import { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLibrary from './ComponentLibrary'
import Layer from './Layer'
export default (() => {
  const itemsAry = [
    {
      key: 'componentLibrary',
      label: (
        <span>
          <AppstoreAddOutlined /> 组件库
        </span>
      ),
      children: (
        <div>
          <ComponentLibrary />
        </div>
      )
    },
    {
      key: 'layer',
      label: (
        <span>
          <BarsOutlined /> 图层
        </span>
      ),
      children: (
        <div>
          <Layer />
        </div>
      )
    }
  ]
  return (
    <div>
      <Tabs defaultActiveKey="componentLibrary" items={itemsAry} />
    </div>
  )
}) as FC
