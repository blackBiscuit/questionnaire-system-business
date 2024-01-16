import { PositionType, inputFocus } from "../../utils/focus"

//type PositionType = 'start' | 'end' | 'all'
export const focusNewOption = (
  wrapperName: string,
  type: PositionType = 'end'
) => {
  const inputAry = document.querySelectorAll<HTMLInputElement>(
    `.${wrapperName} input[type="text"]`
  )
  const len = inputAry.length
  if (len > 0) {
    const input = inputAry[len - 1]
    inputFocus(input,type)
  }
}

