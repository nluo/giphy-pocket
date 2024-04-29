import {
  Box,
  Button,
  Drawer,
  DrawerProps,
  IconButton,
  Typography
} from '@mui/material'
import { GiphyImageLoader } from './GiphyImageLoader'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import { useDrawerContext } from '../context/DrawerContext'

export interface GiphyImageDrawerProps extends DrawerProps {
  handleAddToFavorites: () => void
}

export const GiphyImageDrawer = ({
  handleAddToFavorites,
  ...props
}: GiphyImageDrawerProps) => {
  const { selectedGif, setIsDrawerOpen, isDrawerOpen } = useDrawerContext()
  const handleClose = () => {
    setIsDrawerOpen(false)
  }
  return (
    <Drawer
      variant="temporary"
      anchor="bottom"
      sx={{
        // display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          width: '100%',
          height: '85vh',
          borderTopLeftRadius: '16px', // Add this line
          borderTopRightRadius: '16px' // Add this line
        }
      }}
      {...props}
      open={isDrawerOpen}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        padding={2}
        //   width="100%"
        //   height="100%"
        //   position="relative"
        bgcolor="#fff"
        sx={{
          display: 'flex'
        }}
        pb={2}
      >
        <Box display="flex" justifyContent="flex-end" position="sticky" top={0}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          gap={2}
        >
          <Typography variant="h5" component="div" gutterBottom>
            {selectedGif?.title || 'No title available'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            From: {selectedGif?.username || 'Unknown'}
          </Typography>
        </Box>
        <Box
          flexGrow={2}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
        >
          {selectedGif && (
            <GiphyImageLoader
              imageUrl={selectedGif.images.original.webp}
              altText={selectedGif.title}
              height={Number(selectedGif.images.original.height)}
              width={`${selectedGif.images.original.width}px`}
              loading="lazy"
            />
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          py={2}
          sx={{
            position: 'sticky',
            bottom: 0,
            cursor: 'pointer'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<StarIcon />}
            onClick={handleAddToFavorites}
          >
            Add to favorites
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
