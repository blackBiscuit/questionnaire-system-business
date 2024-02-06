import { FC } from 'react'
import { useParams } from 'react-router'
import { Button, Input, Popover, Space, Tooltip, message } from 'antd'
import { CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { QRCodeSVG } from 'qrcode.react'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'

// url
const URL_LINK = 'http://localhost:3000/question/'
export default (() => {
  const { id } = useParams()
  const { isPublished } = useGetPageInfoData()
  const url = `${URL_LINK}${id}`
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      message.success('复制成功')
    } catch (error) {
      message.error('复制失败')
    }
  }
  if (!isPublished) return null
  return (
    <Space>
      <Input style={{ width: '300px' }} value={url} />
      <Tooltip title="复制链接" color="#108ee9">
        <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Popover content={<QRCodeSVG value={url} size={120} />} trigger="hover">
        <Button icon={<QrcodeOutlined />}></Button>
      </Popover>
    </Space>
  )
}) as FC
