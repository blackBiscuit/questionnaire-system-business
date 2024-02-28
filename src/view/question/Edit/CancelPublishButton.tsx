import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, message, Modal } from 'antd'
import { useRequest } from 'ahooks'
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import { updateQuestionServices } from '../../../services/question'
import { resetPageInfoReducer } from '../../../store/pageInfoReducer'
const { confirm } = Modal
export default (() => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { componentList } = useGetComponentInfo()
  const { title, desc, js, css, isPublished, answerCount, resetTitle } =
    useGetPageInfoData()
  const { loading, run: cancelPublish } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionServices(+id, {
        title,
        desc,
        js,
        css,
        componentList,
        isPublished: false
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('取消发布成功')
        dispatch(
          resetPageInfoReducer({
            title,
            desc,
            js,
            css,
            isPublished: false,
            answerCount,
            resetTitle
          })
        )
      }
    }
  )
  const handleCancelPublish = () => {
    confirm({
      title: '确定取消发布吗，取消发布将会终止问卷收集哟',
      icon: <ExclamationCircleFilled />,
      okText: '是的',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        cancelPublish()
      }
    })
  }
  return (
    <Button
      disabled={loading || !isPublished}
      onClick={handleCancelPublish}
      icon={loading ? <LoadingOutlined /> : null}
      type="primary"
    >
      取消发布
    </Button>
  )
}) as FC
