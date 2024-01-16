import { FC } from 'react'
import QuestionInputConfig, {
  QuestionInputPropsType,
  QuestionInputProps,
  QuestionInputName,
  QuestionInputChangePropsType
} from './QuestionInput'
import QuestionTitleConfig, {
  QuestionTitlePropsType,
  QuestionTitleProps,
  QuestionTitleName,
  QuestionTitleChangePropsType
} from './QuestionTitle'
import QuestionParagraphConfig, {
  QuestionParagraphPropsType,
  QuestionParagraphProps,
  QuestionParagraphName,
  QuestionParagraphChangePropsType
} from './QuestionParagraph'
import QuestionInfoConfig, {
  QuestionInfoPropsType,
  QuestionInfoProps,
  QuestionInfoName,
  QuestionInfoChangePropsType
} from './QuestionInfo'
import QuestionTextAreaConfig, {
  QuestionTextAreaPropsType,
  QuestionTextAreaProps,
  QuestionTextAreaName,
  QuestionTextAreaChangePropsType
} from './QuestionTextArea'
import QuestionRadioConfig, {
  QuestionRadioPropsType,
  QuestionRadioProps,
  QuestionRadioName,
  QuestionRadioChangePropsType
} from './QuestionRadio'
import QuestionCheckConfig, {
  QuestionCheckPropsType,
  QuestionCheckProps,
  QuestionCheckName,
  QuestionCheckChangePropsType
} from './QuestionCheckbox'
// 组件类型 +
export type QuestionComponentType =
  | QuestionInputName
  | QuestionTitleName
  | QuestionParagraphName
  | QuestionInfoName
  | QuestionTextAreaName
  | QuestionRadioName
  | QuestionCheckName
// 组件props +
export type QuestionComponentPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionParagraphPropsType
  | QuestionInfoPropsType
  | QuestionTextAreaPropsType
  | QuestionRadioPropsType
  | QuestionCheckPropsType
export interface QuestionPublicProps {
  title?: string
  component_id: string
  isHidden?: boolean
  isLocked?: boolean
}
export interface PropsQuestionComponentPublicProps<
  T extends QuestionComponentPropsType = QuestionComponentPropsType
> {
  onchange?: (newQuestionInput: T) => void
  disabled?: boolean
}
// 附带onchange +
export type QuestionComponentChangePropsType =
  | QuestionInputChangePropsType
  | QuestionTitleChangePropsType
  | QuestionParagraphChangePropsType
  | QuestionInfoChangePropsType
  | QuestionTextAreaChangePropsType
  | QuestionRadioChangePropsType
  | QuestionCheckChangePropsType
// 和后端统一返回类型 +
export type QuestionComponent =
  | QuestionTitleProps
  | QuestionInputProps
  | QuestionParagraphProps
  | QuestionInfoProps
  | QuestionTextAreaProps
  | QuestionRadioProps
  | QuestionCheckProps
type GetQuestionComponentProps<T extends QuestionComponentType> = FC<
  PickQuestionComponentType<T>
>
// 组件基础配置
export interface ComponentConfigProps<T extends QuestionComponentType> {
  type: QuestionComponentType
  title: string
  Component: GetQuestionComponentProps<T>
  PropsComponent: GetQuestionComponentProps<T>
  defaultProps: PickQuestionComponentType<T>
}
// 对应后端统一返回类型列表 方便推断 component类型 +
export interface QuestionComponentListType {
  questionInput: QuestionInputPropsType
  questionTitle: QuestionTitlePropsType
  questionParagraph: QuestionParagraphPropsType
  questionInfo: QuestionInfoPropsType
  questionTextArea: QuestionTextAreaPropsType
  questionRadio: QuestionRadioPropsType
  questionCheck: QuestionCheckPropsType
}
export type PickQuestionComponentType<T extends QuestionComponentType> =
  QuestionComponentListType[T]
// 获取ComponentConfigProps的联合类型 组件配置联合类型
export type ComponentConfigUniteProps = {
  [key in QuestionComponentType]: key extends QuestionComponentType
    ? ComponentConfigProps<key>
    : never
}[QuestionComponentType]
// 获取 FC Component 的联合类型
export type ComponentFCUniteProps = {
  [key in QuestionComponentType]: key extends QuestionComponentType
    ? FC<PickQuestionComponentType<key>>
    : never
}[QuestionComponentType]
// 所有组件配置列表 +
export const componentConfigList: Array<ComponentConfigUniteProps> = [
  QuestionInputConfig,
  QuestionTitleConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextAreaConfig,
  QuestionRadioConfig,
  QuestionCheckConfig
]
export type ComponentGroupType = 'text' | 'input' | 'select'
// 分组类型
export interface ComponentConfigGroupProps {
  type: ComponentGroupType
  groupName: string
  componentList: ComponentConfigUniteProps[]
}
export const componentConfigGroup: ComponentConfigGroupProps[] = [
  {
    type: 'text',
    groupName: '文字显示',
    componentList: [
      QuestionTitleConfig,
      QuestionParagraphConfig,
      QuestionInfoConfig
    ]
  },
  {
    type: 'input',
    groupName: '用户输入',
    componentList: [QuestionInputConfig, QuestionTextAreaConfig]
  },
  {
    type: 'select',
    groupName: '用户选择',
    componentList: [QuestionRadioConfig, QuestionCheckConfig]
  }
]
export const getComponentConfigByType = (type: QuestionComponentType) =>
  componentConfigList.find((componentConfig) => componentConfig.type === type)
export const getAsComponent = <
  T extends QuestionComponentChangePropsType = QuestionComponentPropsType
>(
  component: ComponentFCUniteProps
) => component as FC<T>
