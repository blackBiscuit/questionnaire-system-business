import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
export * from './interface'
import {
    QuestionRadioDefaultProps,
    QuestionRadioName,
    QUESTION_RADIO_NAME
  } from './interface'
const questionParagraphDefault: ComponentConfigProps<QuestionRadioName> = {
    type: QUESTION_RADIO_NAME,
    title: '单选',
    Component,
    PropsComponent,
    defaultProps: QuestionRadioDefaultProps
  }
  export default questionParagraphDefault
  