import { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, message, Modal } from 'antd'
import { useRequest } from 'ahooks'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { QUESTION_STAT } from '../../../router'
//import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import {
  publishedChangedServices,
  publishedQuestionServices
} from '../../../services/question'
const { confirm } = Modal
export default (() => {
  const { id } = useParams()
  const navigate = useNavigate()
  //const { componentList } = useGetComponentInfo()
  const { isPublished, answerCount } = useGetPageInfoData()
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await publishedQuestionServices(+id, true)
    },
    {
      manual: true,
      onSuccess() {
        message.success(!isPublished ? '发布成功' : '重新发布成功')
        navigate(`${QUESTION_STAT}/${id}`)
      }
    }
  )
  const { loading: changedLoading, run: getChanged } = useRequest(
    async () => {
      if (!id) return
      return await publishedChangedServices<{ isChanged: boolean }>(+id)
    },
    {
      manual: true,
      onSuccess(data) {
        if (data?.isChanged) {
          confirm({
            title: '确定重新发布吗? 问卷改变后，重新发布将清空之前的问卷回答哟!',
            icon: <ExclamationCircleFilled />,
            okText: '是的',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              publish()
            }
          })
        }
      }
    }
  )
  const handlePublish = () => {
    if (answerCount > 0) {
      getChanged()
    } else {
      publish()
    }
  }
  return (
    <Button
      disabled={loading || changedLoading}
      onClick={handlePublish}
      icon={loading ? <LoadingOutlined /> : null}
      type="primary"
    >
      {isPublished ? '重新发布' : '发布'}
    </Button>
  )
}) as FC
