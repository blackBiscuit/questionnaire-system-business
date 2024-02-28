import { AnswerStat } from '../../../types/stat'
import {
  QuestionPublicProps,
  PropsQuestionComponentPublicProps
} from '../index'
export interface OptionType {
  text: string
  value: string
}
export interface QuestionRadioPropsType {
  title?: string
  isVertical?: boolean
  options: OptionType[]
  value?: string
  required?: boolean
}
export type QuestionRadioChangePropsType =
  PropsQuestionComponentPublicProps<QuestionRadioPropsType> &
    QuestionRadioPropsType
export const QuestionRadioDefaultProps: Required<QuestionRadioPropsType> = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      text: '选项1',
      value: 'option1'
    },
    {
      text: '选项2',
      value: 'option2'
    },
    {
      text: '选项3',
      value: 'option3'
    }
  ],
  value: '',
  required: false
}
export const QUESTION_RADIO_NAME = 'questionRadio'
export type QuestionRadioName = typeof QUESTION_RADIO_NAME
export type QuestionRadioProps = QuestionPublicProps & {
  type: QuestionRadioName
  props?: QuestionRadioPropsType
}
// 统计类型
// export type ChartType =
//   | {
//       type: 'pie'
//       text: '饼图'
//     }
//   | {
//       type: 'line'
//       text: '柱状图'
//     }
//   | {
//       type: 'brokenLine'
//       text: '折线图'
//     }
//   | {
//       type: 'bar'
//       text: '条形图'
//     }
//   | {
//       type: 'table'
//       text: '表格'
//     }
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
// | {
//     type: 'pie'
//     text: '饼图'
//   }
// | {
//     type: 'line'
//     text: '柱状图'
//   }
// | {
//     type: 'brokenLine'
//     text: '折线图'
//   }
// | {
//     type: 'bar'
//     text: '条形图'
//   }
// | {
//     type: 'table'
//     text: '表格'
//   }
export interface QuestionRadioStatPropsType {
  stat: AnswerStat[]
  title: string
  // chartTypes: ChartType[]
}
