import { QuestionComponent } from '../components/QuestionComponents'

export interface QuestionData {
  id: number
  title: string
  answerCount: number
  isStar: boolean
  isPublished: boolean
  createAt: string
  isDeleted: boolean
}
export interface QuestionListData {
  list: QuestionData[]
  total: number
}
export interface QuestionInfo {
  id: number
  title: string
  desc?: string
  css?: string
  js?: string
  componentList: QuestionComponent[]
  answerCount: number
  isStar: boolean
  isPublished?: boolean
  createAt: string
  isDeleted: boolean
}
export type UpdateQuestionsOpt = Partial<
  Omit<QuestionInfo, 'id' | 'createAt'>
> & {
  id: number
}
