export interface QuestionData {
  id: string
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
