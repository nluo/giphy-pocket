import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useSearchContext } from '../context/SearchContext'
import { useState } from 'react'
import { BoxProps } from '@mui/system'
import { usePaginationContext } from '../context/PaginationContext'

export interface GiphyImageSearchContainerProps extends BoxProps {}

export const GiphyImageSearchContainer = ({
  ...boxProps
}: GiphyImageSearchContainerProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { setSubmittedSearchTerm } = useSearchContext()
  const { setPage } = usePaginationContext()
  const handleSearch = () => {
    setSubmittedSearchTerm(searchTerm)
  }
  return (
    <Box display="flex" flexDirection="row" bgcolor="#fff" {...boxProps}>
      <TextField
        id="standard-basic"
        label="Search Gifs..."
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                edge="end"
                onClick={() => {
                  setSearchTerm('')
                  setSubmittedSearchTerm('')
                  setPage(1)
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        sx={{ px: 4, borderRadius: `12px` }}
        onClick={handleSearch}
        disabled={!searchTerm}
      >
        Search
      </Button>
    </Box>
  )
}
