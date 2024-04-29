import { Box, BoxProps, CircularProgress, Typography } from '@mui/material'
import { GiphyImageList } from './GiphyImageList'
import { GiphyImageLoader } from './GiphyImageLoader'
import { useGiphyData } from '../hooks/useGiphyData'

export interface GiphyImageContainerProps extends BoxProps {
  numPerPage?: number
  submittedSearchTerm?: string
}

export const GiphyImageContainer = ({
  numPerPage = 10,
  ...boxProps
}: GiphyImageContainerProps) => {
  const { data, isLoading, error, handleGifClick, submittedSearchTerm } =
    useGiphyData(numPerPage)
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      flex={1}
      justifyContent="center"
      pt={2}
      {...boxProps}
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
              key={item.id}
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
          px: 1,
          flex: 1
        }}
      />
    </Box>
  )
}
