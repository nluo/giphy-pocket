import { Box, Pagination } from '@mui/material'
import { BoxProps } from '@mui/system'
export interface GiphyPaginationControlProps extends BoxProps {
  pageCount: number
  page: number
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void
}
export const GiphyPaginationControl = ({
  pageCount,
  page,
  handlePageChange,
  ...boxProps
}: GiphyPaginationControlProps) => (
  <Box
    component="footer"
    width="100%"
    paddingY={2}
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      bgcolor: '#fff',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
      borderTop: '1px solid #ccc'
    }}
    {...boxProps}
  >
    <Pagination
      count={pageCount}
      page={page}
      onChange={handlePageChange}
      color="primary"
    />
  </Box>
)
