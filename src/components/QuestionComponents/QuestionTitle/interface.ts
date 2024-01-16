import { ReactNode } from 'react'
import { QuestionPublicProps, PropsQuestionComponentPublicProps } from '..'

export interface QuestionTitlePropsType {
  level?: 1 | 2 | 3
  isCenter?: boolean
  text: ReactNode
  onchange?: (newQuestionTitle: QuestionTitlePropsType) => void
}
export type QuestionTitleChangePropsType =
  PropsQuestionComponentPublicProps<QuestionTitlePropsType> &
    QuestionTitlePropsType
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  isCenter: false,
  level: 1
}
export const QUESTION_TITLE_NAME = 'questionTitle'
export type QuestionTitleName = typeof QUESTION_TITLE_NAME

export type QuestionTitleProps = QuestionPublicProps & {
  type: QuestionTitleName
  props?: QuestionTitlePropsType
}
