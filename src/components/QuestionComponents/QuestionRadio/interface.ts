import {
  QuestionPublicProps,
  PropsQuestionComponentPublicProps
} from '../index'
export interface OptionType {
  text: string
  value: string
}
export interface QuestionRadioPropsType {
  title?: string
  isVertical?: boolean
  options: OptionType[]
  value?: string
}
export type QuestionRadioChangePropsType =
  PropsQuestionComponentPublicProps<QuestionRadioPropsType> &
    QuestionRadioPropsType
export const QuestionRadioDefaultProps: Required<QuestionRadioPropsType> = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      text: '选项1',
      value: 'option1'
    },
    {
      text: '选项2',
      value: 'option2'
    },
    {
      text: '选项3',
      value: 'option3'
    }
  ],
  value: ''
}
export const QUESTION_RADIO_NAME = 'questionRadio'
export type QuestionRadioName = typeof QUESTION_RADIO_NAME
export type QuestionRadioProps = QuestionPublicProps & {
  type: QuestionRadioName
  props?: QuestionRadioPropsType
}
