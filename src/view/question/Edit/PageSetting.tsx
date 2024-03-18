import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RangePickerProps } from 'antd/es/date-picker'
import { DatePicker, Form, Input, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import locale from 'antd/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import {
  PageInfoType,
  resetPageInfoReducer
} from '../../../store/pageInfoReducer'

const { RangePicker } = DatePicker
const { Paragraph } = Typography
type FieldType = Required<Omit<PageInfoType, 'resetTitle'>>

const { TextArea } = Input
const range = (start: number, end: number) => {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
export default (() => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfoData()
  const [form] = Form.useForm()
  const { isPublished, answerCount, startTime, endTime } = useGetPageInfoData()
  const handleValueChange = () => {
    const newPageInfo = form.getFieldsValue()
    dispatch(
      resetPageInfoReducer({
        isPublished,
        answerCount,
        startTime,
        endTime,
        ...newPageInfo
      })
    )
  }
  useEffect(() => {
    form.setFieldsValue({
      ...pageInfo
    })
  }, [pageInfo, form])
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day')
  }
  const disabledDateTime = (date: dayjs.Dayjs | null) => {
    const currentDay = dayjs().date()
    const currentHours = dayjs().hour()
    const currentMinutes = dayjs().minute()
    const currentSecond = dayjs().second()
    const selectDay = dayjs(date).date()
    const selectHours = dayjs(date).hour()
    const selectMinutes = dayjs(date).minute()
    if (date && currentDay === selectDay) {
      return {
        disabledHours: () => range(0, 24).splice(0, currentHours),
        disabledMinutes: () =>
          currentHours === selectHours
            ? range(0, 60).splice(0, currentMinutes)
            : [],
        disabledSeconds: () =>
          currentMinutes === selectMinutes
            ? range(0, 60).splice(0, currentSecond)
            : []
      }
    }
    return {
      disabledHours: () => range(0, 24).splice(24),
      disabledMinutes: () => range(0, 60).splice(60),
      disabledSeconds: () => []
    }
  }
  const disabledRangeTime: RangePickerProps['disabledTime'] = (
    date: dayjs.Dayjs | null,
    type
  ) => {
    if (type === 'start') {
      return disabledDateTime(date)
    }
    return disabledDateTime(date)
  }
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...pageInfo,
          time:
            pageInfo.timerType === 'closed'
              ? [dayjs(startTime), dayjs(endTime)]
              : dayjs(startTime)
        }}
        onValuesChange={handleValueChange}
      >
        <Form.Item<FieldType>
          label="问卷标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item<FieldType> label="问卷描述" name="desc">
          <TextArea placeholder="问卷描述" />
        </Form.Item>
        <Form.Item<FieldType> label="选择发布时间类型" name="timerType">
          <Select
            options={[
              {
                value: 'closed',
                label: '选择开始时间和截止时间'
              },
              {
                value: 'open',
                label: '选择开始时间'
              }
            ]}
          />
        </Form.Item>
        <Form.Item<FieldType> label="选择发布时间" name="time">
          {pageInfo.timerType === 'open' ? (
            <DatePicker
              locale={locale}
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
            />
          ) : (
            <RangePicker
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs('00:00:00', 'HH:mm:ss'),
                  dayjs('11:59:59', 'HH:mm:ss')
                ]
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </Form.Item>
      </Form>
      {startTime && (
        <Paragraph>
          {endTime ? '已发布问卷开始时间-问卷截止时间' : '已发布问卷开始时间'}
        </Paragraph>
      )}
      {startTime && endTime && (
        <RangePicker
          disabled
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [
              dayjs('00:00:00', 'HH:mm:ss'),
              dayjs('11:59:59', 'HH:mm:ss')
            ]
          }}
          format="YYYY-MM-DD HH:mm:ss"
          value={[dayjs(startTime), dayjs(endTime)]}
        />
      )}
      {startTime && !endTime && (
        <DatePicker
          disabled
          value={dayjs(startTime)}
          locale={locale}
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
        />
      )}
    </div>
  )
}) as FC
