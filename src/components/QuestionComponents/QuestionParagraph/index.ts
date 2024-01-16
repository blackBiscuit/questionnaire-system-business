import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
export * from './interface'
import {
    QuestionParagraphDefaultProps,
    QuestionParagraphName,
    QUESTION_PARAGRAPH_NAME
  } from './interface'
const questionParagraphDefault: ComponentConfigProps<QuestionParagraphName> = {
    type: QUESTION_PARAGRAPH_NAME,
    title: '段落',
    Component,
    PropsComponent,
    defaultProps: QuestionParagraphDefaultProps
  }
  export default questionParagraphDefault
  