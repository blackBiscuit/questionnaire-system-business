import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
export * from './interface'
import {
    QuestionCheckDefaultProps,
    QuestionCheckName,
    QUESTION_CHECK_NAME
  } from './interface'
const questionParagraphDefault: ComponentConfigProps<QuestionCheckName> = {
    type: QUESTION_CHECK_NAME,
    title: '多选',
    Component,
    PropsComponent,
    defaultProps: QuestionCheckDefaultProps
  }
  export default questionParagraphDefault
  