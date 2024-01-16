/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionData, QuestionInfo } from '../types/question'
import axios from './ajax'
interface SearchOption {
  keyword: string
  isStar: number
  isDeleted: number
  page: number
  pageSize: number
}
export const getQuestionServices = async <T extends Record<string, any>>(
  id: string
): Promise<T> => {
  const url = `api/question/${id}`
  const data = (await axios.get(url)) as T
  return data
}
export const getQuestionListServices = async <T extends Record<string, any>>(
  opt?: Partial<SearchOption>
): Promise<T> => {
  const url = 'api/question'
  const data = (await axios.get(url, { params: opt })) as T
  return data
}
export const createQuestionServices = async <
  T extends Record<string, any>
>() => {
  const url = 'api/question'
  const data = (await axios.post(url)) as T
  console.log(data)
  return data
}
export const updateQuestionServices = async <T extends Record<string, any>>(
  id: string,
  opt?: Partial<QuestionInfo>
) => {
  const url = `/api/question/update/${id}`
  const data = (await axios.patch(url, opt)) as T
  return data
}
export const updateQuestionsServices = async <T extends Record<string, any>>(
  list?: Array<Partial<QuestionData>>
) => {
  const url = '/api/questions/update'
  const data = (await axios.patch(url, {
    list
  })) as T
  return data
}
export const duplicateQuestionServices = async <T extends Record<string, any>>(
  id: string
) => {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as T
  return data
}

export const deleteQuestionsServices = async <T extends Record<string, any>>(
  ids: string[]
) => {
  const url = '/api/question'
  return (await axios.delete(url, {
    data: {
      ids
    }
  })) as T
}
