import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
import {
  QuestionTextAreaDefaultProps,
  QuestionTextAreaName,
  QUESTION_TEXT_AREA_NAME
} from './interface'
export * from './interface'
const questionTextAreaDefault: ComponentConfigProps<QuestionTextAreaName> = {
  type: QUESTION_TEXT_AREA_NAME,
  title: '多行输入框',
  Component,
  PropsComponent,
  defaultProps: QuestionTextAreaDefaultProps
}
export default questionTextAreaDefault
