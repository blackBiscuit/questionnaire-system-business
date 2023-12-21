import { useEffect, useRef } from 'react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => any
interface Props {
  target: string | Element | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}
const useObserver = <T extends Element = Element>(
  callback: Callback,
  props: Partial<Props>
) => {
  const { target = '' } = props
  const ele =
    typeof target === 'string' ? document.querySelector<T>(target) : target
  const intersectionObserver = useRef<null | IntersectionObserver>(null)
  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('i am here')
        callback()
      }
    })
    ele && intersectionObserver.current.observe(ele)
    return () => {
      if (ele && intersectionObserver.current) {
        intersectionObserver.current.unobserve(ele)
      }
    }
  }, [callback, ele])
}
export default useObserver
