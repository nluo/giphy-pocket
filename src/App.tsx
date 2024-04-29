import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import './App.css'
import { GiphyImageContainer } from './components/GiphyImageContainer'
import { GiphyImageDrawer } from './components/GiphyImageDrawer'
import { DrawerContextProvider } from './context/DrawerContext'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('')

  const handleSearch = () => {
    setSubmittedSearchTerm(searchTerm)
  }

  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
    >
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

      <Box
        component="main"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <DrawerContextProvider>
          <GiphyImageContainer submittedSearchTerm={submittedSearchTerm} />
          <GiphyImageDrawer
            handleAddToFavorites={() => {
              console.log(`add to fav`)
            }}
          />
        </DrawerContextProvider>
      </Box>
    </Box>
  )
}

export default App
