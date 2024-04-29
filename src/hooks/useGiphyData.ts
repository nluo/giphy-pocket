// hooks/useGiphyData.ts
import { useEffect } from 'react'
import { GifObject } from '../api-types'
import { useGiphyPagination } from './useTrendingGiphy'
import { useDrawerContext } from '../context/DrawerContext'
import { useSearchContext } from '../context/SearchContext'
import { usePaginationContext } from '../context/PaginationContext'

export function useGiphyData(numPerPage: number) {
  const { submittedSearchTerm } = useSearchContext()
  const { page, setTotalPages } = usePaginationContext()
  const { setSelectedGif, setIsDrawerOpen } = useDrawerContext()

  const { data, isLoading, error } = useGiphyPagination(
    page,
    numPerPage,
    submittedSearchTerm
  )

  useEffect(() => {
    if (data?.pagination?.total_count) {
      const pageCount = Math.ceil(data.pagination.total_count / numPerPage)
      setTotalPages(pageCount)
    }
  }, [data, numPerPage, setTotalPages])

  const handleGifClick = (gif: GifObject) => () => {
    setSelectedGif(gif)
    setIsDrawerOpen(true)
  }

  return { data, isLoading, error, handleGifClick, submittedSearchTerm }
}
