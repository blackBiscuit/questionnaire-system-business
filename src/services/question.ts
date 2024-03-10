/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionInfo, UpdateQuestionsOpt } from '../types/question'
import axios from './ajax'
//0 | 1
interface SearchOption {
  keyword: string
  isStar: number
  isDeleted: number
  page: number
  pageSize: number
}
type ResData = Record<string, any> | null
export const getQuestionServices = async <T extends Record<string, any> | null>(
  id: number
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
  return data
}
export const updateQuestionServices = async <T extends Record<string, any>>(
  id: number,
  opt?: Partial<Omit<QuestionInfo, 'id'>>
) => {
  const url = `/api/question/update/${id}`
  const data = (await axios.patch(url, opt)) as T
  return data
}
export const updateQuestionsServices = async <T extends Record<string, any>>(
  list?: Array<UpdateQuestionsOpt>
) => {
  const url = '/api/questions/update'
  const data = (await axios.patch(url, {
    list
  })) as T
  return data
}
export const duplicateQuestionServices = async <T extends Record<string, any>>(
  id: number
) => {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as T
  return data
}

export const deleteQuestionsServices = async <T extends Record<string, any>>(
  ids: number[]
) => {
  const url = '/api/question'
  return (await axios.delete(url, {
    data: {
      ids
    }
  })) as T
}
export const publishedQuestionServices = async <T extends Record<string, any>>(
  id: number,
  published: boolean,
  startTime?: Date,
  endTime?: Date
) => {
  const url = `/api/question/published/${id}`
  return (await axios.patch(url, {
    published,
    startTime,
    endTime
  })) as T
}
export const publishedChangedServices = async <T extends Record<string, any>>(
  id: number
) => {
  const url = `/api/question/published/changed/${id}`
  return (await axios.get(url)) as T
}
export const getQuestionTemplateServices = async <
  T extends Record<string, any>
>() => {
  const url = '/api/question/template/'
  return (await axios.get(url)) as T
}
export const getQuestionGroupServices = async <T extends Record<string, any>>(
  type?: number
) => {
  const url = '/api/question/group/'
  return (await axios.get(url, {
    params: {
      type
    }
  })) as T
}

export const getQuestionGroupItemServices = async <T extends ResData>(
  id: number
) => {
  const url = `/api/question/group/${id}`
  return (await axios.get(url)) as T
}
export const getQuestionTemplateItemServices = async <T extends ResData>(
  id: number
) => {
  const url = `/api/question/template/${id}`
  return (await axios.get(url)) as T
}
export const duplicateQuestionTemplateServices = async <T extends ResData>(
  id: number
) => {
  const url = `/api/question/template/duplicate/${id}`
  return (await axios.get(url)) as T
}
