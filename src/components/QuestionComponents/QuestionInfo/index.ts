import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
export * from './interface'
import {
    QuestionInfoDefaultProps,
    QuestionInfoName,
    QUESTION_INFO_NAME
  } from './interface'
const QuestionInfoDefault: ComponentConfigProps<QuestionInfoName> = {
    type: QUESTION_INFO_NAME,
    title: '文本信息',
    Component,
    PropsComponent,
    defaultProps: QuestionInfoDefaultProps
  }
  export default QuestionInfoDefault
  