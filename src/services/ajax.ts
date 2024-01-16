import axios from 'axios'
import Nprogress from 'nprogress'
import { message } from 'antd'
// type Enumerate<
//   T extends number,
//   R extends number[] = []
// > = R['length'] extends T ? R[number] : Enumerate<T, [R['length'], ...R]>
// type RangeNumber<Min extends number, Max extends number> = Exclude<
//   Enumerate<Max>,
//   Enumerate<Min>
// >

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ResTypeSuccess<T = Record<string, any>> {
  errno: 0
  data: T
}
interface ResTypeFail {
  errno: number // RangeNumber<1, 700>
  msg: string
}
export type ResType = ResTypeSuccess | ResTypeFail

const aInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10 * 1000
})
aInstance.interceptors.request.use((req) => {
  Nprogress.start()
  return req
})
aInstance.interceptors.response.use(
  (res) => {
    Nprogress.done()
    const resData = (res.data || {}) as ResType
    if (resData.errno !== 0) {
      const { msg } = resData as ResTypeFail
      message.error(msg)
      throw new Error(msg)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (resData as ResTypeSuccess).data as any
    }
  },
  () => {
    Nprogress.done()
  }
)
export default aInstance
