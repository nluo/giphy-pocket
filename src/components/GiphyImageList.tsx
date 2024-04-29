import { Box, BoxProps } from '@mui/material'
import { GIFObject } from '../api-types'

export interface GiphyImageListProps extends BoxProps {
  items: GIFObject[]
  renderItem: (item: GIFObject) => React.ReactNode
}

export const GiphyImageList = ({
  items,
  renderItem,
  ...props
}: GiphyImageListProps) => {
  return (
    <Box
      sx={{
        columnCount: 2,
        columnGap: 1
      }}
      {...props}
    >
      {items.map((item) => renderItem(item))}
    </Box>
  )
}
