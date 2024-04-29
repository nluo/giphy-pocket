import {
  Box,
  BoxProps,
  CircularProgress,
  Pagination,
  Typography
} from '@mui/material'

import { GiphyImageList } from './GiphyImageList'
import { GiphyImageLoader } from './GiphyImageLoader'
import { GifObject } from '../api-types'
import { useGiphyPagination } from '../hooks/useTrendingGiphy'
import { useState } from 'react'
import { useDrawerContext } from '../context/DrawerContext'

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
      <Box
        component="footer"
        width="100%"
        paddingY={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="sticky"
        bottom="0"
        sx={{
          bgcolor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.2)', // Creates a shadow at the top of the footer
          borderTop: '1px solid #ccc'
        }}
      >
        <Pagination
          count={pageCount} // Total number of pages
          page={page}
          onChange={handlePageChange}
          color="primary"
          // size="large"
        />
      </Box>
    </Box>
  )
}
