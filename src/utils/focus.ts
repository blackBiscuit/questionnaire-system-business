export type PositionType = 'start' | 'end' | 'all'
export const inputFocus = (input: HTMLInputElement, type: PositionType) => {
    const valueLen = input.value.length
    const offsetPosition = {
      start: {
        startNum: 0,
        endNum: 0
      },
      end: {
        startNum: valueLen,
        endNum: valueLen
      },
      all: {
        startNum: 0,
        endNum: valueLen
      }
    }
    input.focus()
    const { startNum, endNum } = offsetPosition[type]
    input.setSelectionRange(startNum, endNum)
  }