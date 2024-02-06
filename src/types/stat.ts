export interface AnswerProps {
  [key: string]: string
  id: string
}
export interface StatQuestion {
  total: number
  list: AnswerProps[]
}
export interface AnswerStat  {
  name: string
  count: number
}