import { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { LoadingOutlined } from '@ant-design/icons'
import { QUESTION_STAT } from '../../../router'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import { updateQuestionServices } from '../../../services/question'
export default (() => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { componentList } = useGetComponentInfo()
  const { title, desc, js, css } = useGetPageInfoData()
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionServices(id, {
        title,
        desc,
        js,
        css,
        componentList,
        isPublished: true
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        navigate(`${QUESTION_STAT}/${id}`)
      }
    }
  )
  return (
    <Button
      disabled={loading}
      onClick={publish}
      icon={loading ? <LoadingOutlined /> : null}
      type="primary"
    >
      发布
    </Button>
  )
}) as FC
