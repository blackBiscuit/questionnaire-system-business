import {
  PropsQuestionComponentPublicProps,
  QuestionPublicProps
} from '../index'
export interface RateProps {
  text: string
  value: number
  key: string
  required?: boolean
}
export interface QuestionRatePropsType {
  title?: string
  rates: RateProps[]
  // required?: boolean
  allowHalf?: boolean
}

export type QuestionRateChangePropsType =
  PropsQuestionComponentPublicProps<QuestionRatePropsType> &
    QuestionRatePropsType
export type QuestionRateProps = QuestionPublicProps & {
  type: QuestionRateName
  props?: QuestionRatePropsType
}
export const QuestionRateDefaultProps: Required<QuestionRatePropsType> = {
  title: '评分',
  rates: [
    {
      text: '评分1',
      value: 5,
      key: 'rate1',
      required: false
    },
    {
      text: '评分2',
      value: 5,
      key: 'rate2',
      required: false
    },
    {
      text: '评分3',
      value: 5,
      key: 'rate3',
      required: false
    }
  ],
  // required: false,
  allowHalf: false
}
export const QUESTION_RATE_NAME = 'questionRate'
export type QuestionRateName = typeof QUESTION_RATE_NAME
