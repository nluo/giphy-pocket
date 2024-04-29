import { Box } from '@mui/material'
import './App.css'
import { GiphyImageContainer } from './components/GiphyImageContainer'
import { GiphyImageDrawer } from './components/GiphyImageDrawer'
import { DrawerContextProvider } from './context/DrawerContext'
import { SearchContextProvider } from './context/SearchContext'
import { GiphyImageSearchContainer } from './components/GiphySearchContainer'
import { PaginationProvider } from './context/PaginationContext'
import { GiphyPaginationContainer } from './components/GiphyPaginationContainer'

function App() {
  return (
    <PaginationProvider>
      <SearchContextProvider>
        <Box
          width="100vw"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          maxWidth="500px"
        >
          <GiphyImageSearchContainer
            component="header"
            position="sticky"
            top={0}
            gap={4}
            px={2}
            py={2}
            sx={{
              boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
              borderBottom: '1px solid #ccc'
            }}
          />
          <Box
            component="main"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex={1}
          >
            <DrawerContextProvider>
              <GiphyImageContainer numPerPage={10} alignSelf="flex-start" />
              <GiphyImageDrawer
                handleAddToFavorites={() => {
                  console.log(`add to fav`)
                }}
              />
            </DrawerContextProvider>
          </Box>

          <GiphyPaginationContainer
            component="footer"
            position="sticky"
            bottom={0}
          />
        </Box>
      </SearchContextProvider>
    </PaginationProvider>
  )
}

export default App
