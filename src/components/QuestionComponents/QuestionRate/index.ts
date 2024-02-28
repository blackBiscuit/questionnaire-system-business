import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
export * from './interface'
import {
  QuestionRateDefaultProps,
  QuestionRateName,
  QUESTION_RATE_NAME
} from './interface'
const questionRateDefault: ComponentConfigProps<QuestionRateName> = {
  type: QUESTION_RATE_NAME,
  title: '评分',
  Component,
  PropsComponent,
  defaultProps: QuestionRateDefaultProps
}
export default questionRateDefault
