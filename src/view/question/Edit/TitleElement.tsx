import { FC, useState, useRef, useEffect } from 'react'
import { Typography, Button, Space, Input, InputRef } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Title } = Typography
interface Props {
  title?: string
  onBlur?: (title: string) => void
  onPressEnter?: (title: string) => void
  onChange?: (title: string) => void
}
export default ((props) => {
  const { title = '问卷标题', onPressEnter, onBlur, onChange } = props
  const InputRef = useRef<null | InputRef>(null)
  const [editState, setEditState] = useState(false)
  useEffect(() => {
    if (editState && InputRef.current) {
      InputRef.current.focus()
    }
  }, [editState])
  return (
    <Space>
      {editState ? (
        <Input
          ref={InputRef}
          value={title}
          onChange={(e) => {
            const target = e.target
            const newTitle = target.value
            onChange && onChange(newTitle)
          }}
          onBlur={(e) => {
            const target = e.target
            const newTitle = target.value
            setEditState(false)
            onBlur && onBlur(newTitle)
          }}
          onPressEnter={(e) => {
            console.log(e)
            const target = e.target as HTMLInputElement
            const newTitle = target.value
            setEditState(false)
            onPressEnter && onPressEnter(newTitle)
          }}
        />
      ) : (
        <Title>{title}</Title>
      )}
      <Button
        shape="circle"
        type="text"
        icon={<EditOutlined />}
        onClick={() => {
          setEditState(true)
        }}
      />
    </Space>
  )
}) as FC<Props>
