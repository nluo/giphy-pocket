import { Box, Pagination, Skeleton } from '@mui/material'
import { BoxProps } from '@mui/system'
import { usePaginationContext } from '../context/PaginationContext'
export interface GiphyPaginationControlProps extends BoxProps {}
export const GiphyPaginationContainer = ({
  // pageCount,
  // page,
  // handlePageChange,
  ...boxProps
}: GiphyPaginationControlProps) => {
  const { totalPages, page, setPage } = usePaginationContext()

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }
  return (
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
      {/* show a rectangle skeleton with 32px height if totalPages is 0  */}

      {totalPages === 0 ? (
        <Skeleton variant="rectangular" height="32px" width="100%" />
      ) : (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </Box>
  )
}
