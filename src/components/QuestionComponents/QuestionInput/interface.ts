import {
  QuestionPublicProps,
  PropsQuestionComponentPublicProps
} from '../index'
export interface QuestionInputPropsType {
  title?: string
  placeholder?: string
}
export type QuestionInputChangePropsType =
  PropsQuestionComponentPublicProps<QuestionInputPropsType> &
    QuestionInputPropsType
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '单行输入框标题',
  placeholder: '请输入:'
}
export const QUESTION_INPUT_NAME = 'questionInput'
export type QuestionInputName = typeof QUESTION_INPUT_NAME
export type QuestionInputProps = QuestionPublicProps & {
  type: QuestionInputName
  props?: QuestionInputPropsType
}
