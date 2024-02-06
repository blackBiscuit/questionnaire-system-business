import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'
export * from './interface'
import {
    QuestionCheckDefaultProps,
    QuestionCheckName,
    QUESTION_CHECK_NAME
  } from './interface'
const questionCheckDefault: ComponentConfigProps<QuestionCheckName> = {
    type: QUESTION_CHECK_NAME,
    title: '多选',
    Component,
    PropsComponent,
    StatComponent,
    defaultProps: QuestionCheckDefaultProps
  }
  export default questionCheckDefault
  