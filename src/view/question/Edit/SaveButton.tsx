import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { LoadingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import { updateQuestionServices } from '../../../services/question'
import { QuestionCheckProps } from '../../../components/QuestionComponents/QuestionCheckbox'
import { QuestionRadioProps } from '../../../components/QuestionComponents/QuestionRadio'
export default (() => {
  const { id } = useParams()
  const { componentList } = useGetComponentInfo()
  const { title, desc, resetTitle } = useGetPageInfoData()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      const list = componentList.map((component) => {
        if (component.type === 'questionCheck') {
          const props = component.props
          return {
            ...component,
            props: {
              ...component.props,
              list: props?.list.map((item) => ({
                ...item,
                text: item.text.trim()
              }))
            }
          } as QuestionCheckProps
        }
        if(component.type === 'questionRadio') {
          const props = component.props
          return {
            ...component,
            props: {
              ...component.props,
              list: props?.options.map((item) => ({
                ...item,
                text: item.text.trim()
              }))
            }
          } as QuestionRadioProps
        }
        return component
      })
      await updateQuestionServices(+id, {
        title,
        desc,
        componentList:list
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
    [componentList, desc, resetTitle],
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
