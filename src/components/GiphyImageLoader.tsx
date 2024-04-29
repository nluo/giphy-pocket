import { Box, BoxProps } from '@mui/material'
import React, { useState } from 'react'

export interface ImageLoaderProps extends BoxProps {
  imageUrl: string
  altText: string
  height?: number
  handleGifClick?: () => void
}
export const GiphyImageLoader = ({
  handleGifClick,
  imageUrl,
  altText,
  height = 200,
  ...boxProps
}: ImageLoaderProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >) => {
  const [loaded, setLoaded] = useState(false)
  const placeholder =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // small transparent GIF

  return (
    <Box
      width={`calc(min(200px, 50vw - 8px))`}
      height={`${height}px`}
      bgcolor="#ccc"
      borderRadius="16px"
      sx={{
        breakInside: 'avoid',
        marginBottom: 2
      }}
      {...boxProps}
    >
      <img
        src={loaded ? imageUrl : placeholder}
        alt={altText}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: loaded ? 1 : 0,
          borderRadius: `16px`
        }}
        onLoad={() => setLoaded(true)}
        onClick={handleGifClick}
      />
    </Box>
  )
}
