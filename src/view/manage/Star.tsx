import { FC, useEffect, useState, useMemo } from 'react'
import { useRequest } from 'ahooks'
import { Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useObserver from '../../hooks/useObserver'
import styles from './Content.module.scss'
import { DEFAULT_LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../const'
import Loading from '../../components/Loading'
import { getQuestionListServices } from '../../services/question'
import { QuestionData, QuestionListData } from '../../types/question'
import { useSearchParams } from 'react-router-dom'
export default (() => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [searchParams] = useSearchParams()
  // const { data = DEFAULT_QUESTION_DATA, loading } = useLoadQuestionListData({
  //isStar: TRUE_NUMBER
  //})
  // const { list: questions } = data
  const keyword = useMemo(
    () => searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
    [searchParams]
  )
  const { run, loading } = useRequest(
    async () => {
      const data = await getQuestionListServices<QuestionListData>({
        page,
        pageSize: DEFAULT_LIST_PAGE_SIZE,
        keyword
      })
      return data
    },
    {
      manual: true,
      onSuccess(data) {
        const newQuestions = [...questions, ...data.list]
        setQuestions(newQuestions)
        setTotal(data.total)
        setPage(page + 1)
      }
    }
  )
  const [questions, setQuestions] = useState<QuestionData[]>([])
  const haveMoreData = useMemo(() => {
    return questions.length < total
  }, [total, questions])
  useObserver(
    useMemo(() => {
      return () => {
        if (loading || !haveMoreData) return
        run()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, haveMoreData]),
    {
      target: '.load-more-content'
    }
  )
  // useEffect(() => {
  //    const loadingT = document.querySelector<HTMLSpanElement>('.load-more-content')

  //   intersectionObserver.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       console.log('i am here')
  //       run()
  //     }
  //   })
  //   loadingT && intersectionObserver.current.observe(loadingT)
  //   return () => {
  //     if (loadingT && intersectionObserver.current) {
  //       intersectionObserver.current.unobserve(loadingT)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading])
  useEffect(() => {
    setQuestions([])
    setPage(1)
    setTotal(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])
  useEffect(() => {
    setTimeout(() => {
      run()
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
  // keyword发生变化重置

  useEffect(() => {
    console.log(page)
  }, [page])
  const loadMoreContent = useMemo(() => {
    if (loading) return <Loading />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了！</span>
    return <span className="loading-test">loading</span>
  }, [loading, total, haveMoreData])
  return (
    <div className={styles['lists-wrapper']}>
      <div className={styles['lists-headers']}>
        <h1 className={styles['question-list-title']}>星标问卷</h1>
        <div className={styles['question-search-wrapper']}>
          <ListSearch />
        </div>
      </div>
      <>
        <div className={styles['question-list-content']}>
          {questions.map((question) => (
            <QuestionCard {...question} key={question.id} />
          ))}
        </div>
        <div className={styles['question-pagination-container']}>
          <div className="load-more-content">{loadMoreContent}</div>
          {/* <span className="loading-test">loading</span> */}
        </div>
      </>
    </div>
  )
}) as FC
