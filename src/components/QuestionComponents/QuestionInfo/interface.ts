import { PropsQuestionComponentPublicProps, QuestionPublicProps } from '..'

export interface QuestionInfoPropsType {
  title?: string
  desc?: string
}
export type QuestionInfoChangePropsType =
  PropsQuestionComponentPublicProps<QuestionInfoPropsType> &
    QuestionInfoPropsType
export const QuestionInfoDefaultProps: Required<QuestionInfoPropsType> = {
  title: '问卷标题',
  desc: '问卷描述'
}
export const QUESTION_INFO_NAME = 'questionInfo'
export type QuestionInfoName = typeof QUESTION_INFO_NAME
export type QuestionInfoProps = QuestionPublicProps & {
  type: QuestionInfoName
  props?: QuestionInfoPropsType
}
