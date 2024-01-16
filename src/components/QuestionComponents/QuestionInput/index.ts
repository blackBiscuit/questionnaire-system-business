import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
import {
  QuestionInputDefaultProps,
  QuestionInputName,
  QUESTION_INPUT_NAME
} from './interface'
export * from './interface'
const questionInputDefault: ComponentConfigProps<QuestionInputName> = {
  type: QUESTION_INPUT_NAME,
  title: '输入框',
  Component,
  PropsComponent,
  defaultProps: QuestionInputDefaultProps
}
export default questionInputDefault
