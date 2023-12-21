import { FC } from 'react'
import ListSearch from '../../components/ListSearch'
import QuestionCard from '../../components/QuestionCard'
import styles from './Content.module.scss'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import Loading from '../../components/Loading'
import ListPagination from '../../components/ListPagination'
export default (() => {
  //const [questionList, setQuestionList] = useState<QuestionData[]>([])

  const { data = { list: [], total: 0 }, loading } = useLoadQuestionListData()
  const { list: questionList, total } = data
  // useEffect(() => {
  //   console.log(page)
  //   navigate(`${pathname}?${LIST_PAGE_PARAM_KEY}=${page}`)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page])
  return (
    <div className={styles['lists-wrapper']}>
      <div className={styles['lists-headers']}>
        <h1 className={styles['question-list-title']}>我的问卷</h1>
        <div className={styles['question-search-wrapper']}>
          <ListSearch />
        </div>
      </div>

      <div className={styles['question-list-content']}>
        {loading && <Loading />}
        {!loading &&
          questionList.map((question) => (
            <QuestionCard {...question} key={question.id} />
          ))}
      </div>
      <div className={styles['question-pagination-container']}>
        <ListPagination total={total} />
      </div>
    </div>
  )
}) as FC
