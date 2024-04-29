import { Box, BoxProps, CircularProgress, Typography } from '@mui/material'

import { GiphyImageList } from './GiphyImageList'
import { GiphyImageLoader } from './GiphyImageLoader'
import { GifObject } from '../api-types'
import { useGiphyPagination } from '../hooks/useTrendingGiphy'
import { useState } from 'react'
import { useDrawerContext } from '../context/DrawerContext'
import { GiphyPaginationControl } from './PaginationFooter'

export interface GiphyImageContainerProps extends BoxProps {
  numPerPage?: number
  submittedSearchTerm?: string
}

export const GiphyImageContainer = ({
  numPerPage = 10,
  submittedSearchTerm = ``
}: GiphyImageContainerProps) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGiphyPagination(
    page,
    numPerPage,
    submittedSearchTerm
  )
  const { setSelectedGif, setIsDrawerOpen } = useDrawerContext()
  const handleGifClick = (gif: GifObject) => () => {
    console.log(`🚀 ------------------------------🚀`)
    console.log(`🚀 ~ handleGifClick ~ gif:`, gif)
    console.log(`🚀 ------------------------------🚀`)
    setSelectedGif(gif)
    setIsDrawerOpen(true)
  }
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: React.SetStateAction<number>
  ) => {
    setPage(value)
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="secondary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body1" component="div" gutterBottom>
          {error.message}
        </Typography>
      </Box>
    )
  }

  if (!data) {
    return (
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body1" component="div" gutterBottom>
          No GIFs shown/found. Please try again later.
        </Typography>
      </Box>
    )
  }

  const { data: gifObjects } = data
  const totalItemCount = data?.pagination?.total_count
  const pageCount = Math.ceil(totalItemCount / numPerPage)

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      pt={2}
    >
      <Typography
        variant="subtitle1"
        color="text.secondary"
        px={1}
        pb={1}
        alignSelf="flex-start"
      >
        {submittedSearchTerm
          ? `Search results for "${submittedSearchTerm}"`
          : `Trending GIFs`}
      </Typography>
      <GiphyImageList
        items={gifObjects}
        renderItem={(item) => {
          const { images, alt_text: altText } = item

          const fixedWidthImage = images.fixed_width

          return (
            <GiphyImageLoader
              imageUrl={`${fixedWidthImage.url}`}
              altText={altText}
              height={Number(fixedWidthImage.height)}
              loading="lazy"
              handleGifClick={handleGifClick(item)}
            />
          )
        }}
        sx={{
          columnCount: 2,
          columnGap: 1,
          px: 1
        }}
      />
      <GiphyPaginationControl
        pageCount={pageCount}
        handlePageChange={handlePageChange}
        page={page}
        position="sticky"
        bottom="0"
      />
    </Box>
  )
}
