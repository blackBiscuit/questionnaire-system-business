import { useEffect,RefObject } from 'react'
const useScrollToElement = (
  scrollRef: RefObject<Element | null>,
  id?: number | string
) => {
  useEffect(() => {
    if (id && scrollRef.current) {
      const children = scrollRef.current.children
      const currentChild: HTMLDivElement | undefined =
        Array.prototype.find.call(children, (child: HTMLDivElement) => {
          //child.dataset.selectedId child.getAttribute('data-selected-id')
          const childId = child.dataset.selectedId
          return childId === id
        })
      if (currentChild) {
        scrollRef.current.scrollTo({
          top: currentChild.offsetTop,
          behavior: 'smooth'
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
}
export default useScrollToElement
