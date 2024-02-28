import { AnswerStat } from '../../../types/stat'
import {
  QuestionPublicProps,
  PropsQuestionComponentPublicProps
} from '../index'
export interface OptionType {
  text: string
  value: string
  checked: boolean
}
export interface QuestionCheckPropsType {
  title?: string
  isVertical?: boolean
  list: OptionType[]
  required?: boolean
  requiredNum: number
}
export type QuestionCheckChangePropsType =
  PropsQuestionComponentPublicProps<QuestionCheckPropsType> &
    QuestionCheckPropsType
export const QuestionCheckDefaultProps: Required<QuestionCheckPropsType> = {
  title: '多选标题',
  isVertical: false,
  list: [
    {
      text: '选项1',
      value: 'option1',
      checked: false
    },
    {
      text: '选项2',
      value: 'option2',
      checked: false
    },
    {
      text: '选项3',
      value: 'option3',
      checked: false
    }
  ],
  required: false,
  requiredNum: 0
}
export const QUESTION_CHECK_NAME = 'questionCheck'
export type QuestionCheckName = typeof QUESTION_CHECK_NAME
export type QuestionCheckProps = QuestionPublicProps & {
  type: QuestionCheckName
  props?: QuestionCheckPropsType
}
export interface QuestionCheckStatPropsType {
  stat: AnswerStat[]
  title: string
}
export const chartTypeList = {
  pie: '饼图',
  line: '柱状图',
  bar: '条形图',
  brokenLine: '折线图',
  table: '表格'
} as const
export type ChartType = 'pie' | 'line' | 'brokenLine' | 'bar' | 'table'
export const getChartType = (type: ChartType) => chartTypeList[type]
export const statTypeList = Object.keys(chartTypeList).map((key) => ({
  type: key,
  text: chartTypeList[key as ChartType]
}))
