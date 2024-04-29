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

export interface GiphyImageSearchContainerProps extends BoxProps {}

export const GiphyImageSearchContainer = ({
  ...boxProps
}: GiphyImageSearchContainerProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { setSubmittedSearchTerm } = useSearchContext()
  const handleSearch = () => {
    setSubmittedSearchTerm(searchTerm)
  }
  return (
    <Box
      component="header"
      display="flex"
      flexDirection="row"
      gap={4}
      px={2}
      py={2}
      position="sticky"
      bgcolor="#fff"
      top={0}
      sx={{
        boxShadow: '0 -2px 10px rgba(0,0,0,0.2)', // Creates a shadow at the top of the footer
        borderBottom: '1px solid #ccc' // Adds a top border
      }}
      {...boxProps}
    >
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
