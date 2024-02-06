/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from './ajax'
export const getQuestionStatListServices = async <
  T extends Record<string, any>
>(
  id: string
): Promise<T> => {
  const url = `/api/stat/${id}`
  const data = (await axios.get(url)) as T
  return data
}
export const getComponentStatServices = async <T extends Record<string, any>>(
  questionId: string,
  componentId: string
): Promise<T> => {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as T
  return data
}
