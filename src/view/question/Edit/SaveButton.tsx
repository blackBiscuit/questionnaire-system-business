import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { LoadingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import { updateQuestionServices } from '../../../services/question'
export default (() => {
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const { title, desc, js, css, resetTitle } = useGetPageInfoData()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionServices(id, {
        title,
        desc,
        js,
        css,
        componentList
      })
    },
    { manual: true }
  )
  useKeyPress(['ctrl.s', 'meta.s'], (e) => {
    e.preventDefault()
    if (!loading) {
      save()
    }
  })
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, desc, js, css, resetTitle],
    {
      wait: 1000
    }
  )
  return (
    <Button
      disabled={loading}
      onClick={save}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
  )
}) as FC
