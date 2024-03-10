import { QuestionComponent } from '../components/QuestionComponents'

export interface QuestionData {
  id: number
  title: string
  answerCount: number
  isStar: boolean
  isPublished: boolean
  createAt: string
  isDeleted: boolean
  startTime: Date | null
  endTime: Date | null
}
export interface QuestionListData {
  list: QuestionData[]
  total: number
}
export interface QuestionInfo {
  id: number
  title: string
  desc?: string
  componentList: QuestionComponent[]
  answerCount: number
  isStar: boolean
  isPublished?: boolean
  createAt: string
  isDeleted: boolean
  startTime: Date | null
  endTime: Date | null
}
export type UpdateQuestionsOpt = Partial<
  Omit<QuestionInfo, 'id' | 'createAt'>
> & {
  id: number
}
export interface TemplateKind {
  id: number
  kind: string
}
export interface TemplateGroup {
  id: number
  title: string
  desc: string
}
export interface TemplateGroupItemDesc {
  id: number
  title: string
  createAt: string
}
export interface TemplateGroupItem {
  title: string
  desc: string
  list: TemplateGroupItemDesc[]
}
export type TemplateQuestionInfo = Pick<
  QuestionInfo,
  'id' | 'componentList' | 'title' | 'desc' | 'createAt'
> & {
  groupId: number
  group: {
    title: string
  }
}
