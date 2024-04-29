import { Box, BoxProps } from '@mui/material'
import React, { useState } from 'react'

export interface ImageLoaderProps extends BoxProps {
  imageUrl: string
  altText: string
  width?: number
  height?: number
  handleGifClick?: () => void
}
export const GiphyImageLoader = ({
  handleGifClick,
  imageUrl,
  altText,
  height = 200,
  ...props
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
      style={{
        width: `calc(min(200px, 50vw - 8px))`,
        height: `${height}px`,
        backgroundColor: '#ccc',
        borderRadius: `16px`
      }}
      sx={{
        breakInside: `avoid`,
        marginBottom: 2
      }}
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
        {...props}
      />
    </Box>
  )
}
