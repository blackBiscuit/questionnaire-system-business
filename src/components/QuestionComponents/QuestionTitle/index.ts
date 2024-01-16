import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
import {
  QuestionTitleDefaultProps,
  QuestionTitleName,
  QUESTION_TITLE_NAME
} from './interface'
export * from './interface'
const questionTitleDefault: ComponentConfigProps<QuestionTitleName> = {
  type: QUESTION_TITLE_NAME,
  title: '标题',
  Component,
  PropsComponent,
  defaultProps: QuestionTitleDefaultProps
}
export default questionTitleDefault
