import { ComponentConfigProps } from '..'
import Component from './Component'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'
export * from './interface'
import {
    QuestionRadioDefaultProps,
    QuestionRadioName,
    QUESTION_RADIO_NAME
  } from './interface'
const questionRadioDefault: ComponentConfigProps<QuestionRadioName> = {
    type: QUESTION_RADIO_NAME,
    title: '单选',
    Component,
    PropsComponent,
    defaultProps: QuestionRadioDefaultProps,
    StatComponent
  }       
  export default questionRadioDefault
  