import { PropsQuestionComponentPublicProps, QuestionPublicProps } from '..'

export interface QuestionParagraphPropsType {
  text?: string
  isCenter?: boolean
}
export type QuestionParagraphChangePropsType =
  PropsQuestionComponentPublicProps<QuestionParagraphPropsType> &
    QuestionParagraphPropsType
export const QuestionParagraphDefaultProps: Required<QuestionParagraphPropsType> = {
  text: '一行段落',
  isCenter: false,
}
export const QUESTION_PARAGRAPH_NAME = 'questionParagraph'
export type QuestionParagraphName = typeof QUESTION_PARAGRAPH_NAME
export type QuestionParagraphProps = QuestionPublicProps & {
  type: QuestionParagraphName
  props?: QuestionParagraphPropsType
}
