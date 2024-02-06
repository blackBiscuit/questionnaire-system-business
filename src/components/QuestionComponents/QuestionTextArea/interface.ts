import {
  QuestionPublicProps,
  PropsQuestionComponentPublicProps
} from '../index'
export interface QuestionTextAreaPropsType {
  title?: string
  placeholder?: string
  required?: boolean
}
export type QuestionTextAreaChangePropsType =
  PropsQuestionComponentPublicProps<QuestionTextAreaPropsType> &
    QuestionTextAreaPropsType
export const QuestionTextAreaDefaultProps: Required<QuestionTextAreaPropsType> =
  {
    title: '多行输入框标题',
    placeholder: '请输入:',
    required: false
  }
export const QUESTION_TEXT_AREA_NAME = 'questionTextArea'
export type QuestionTextAreaName = typeof QUESTION_TEXT_AREA_NAME
export type QuestionTextAreaProps = QuestionPublicProps & {
  type: QuestionTextAreaName
  props?: QuestionTextAreaPropsType
}
