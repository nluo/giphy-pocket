import { Box } from '@mui/material'
import './App.css'
import { GiphyImageContainer } from './components/GiphyImageContainer'
import { GiphyImageDrawer } from './components/GiphyImageDrawer'
import { DrawerContextProvider } from './context/DrawerContext'
import { SearchContextProvider } from './context/SearchContext'
import { GiphyImageSearchContainer } from './components/GiphySearchContainer'

function App() {
  return (
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
        <GiphyImageSearchContainer />
        <Box
          component="main"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flex={1}
          height="100%"
        >
          <DrawerContextProvider>
            <GiphyImageContainer numPerPage={10} />
            <GiphyImageDrawer
              handleAddToFavorites={() => {
                console.log(`add to fav`)
              }}
            />
          </DrawerContextProvider>
        </Box>
      </Box>
    </SearchContextProvider>
  )
}

export default App
