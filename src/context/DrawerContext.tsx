import React, { ReactNode, createContext, useContext, useState } from 'react'
import { GifObject } from '../api-types'

export interface DrawerContextData {
  selectedGif: GifObject | null
  setSelectedGif: (gif: GifObject | null) => void
  isDrawerOpen: boolean
  setIsDrawerOpen: (isOpen: boolean) => void
}

export interface DrawerContextProviderProps {
  children: ReactNode
}

const DrawerContext = createContext<DrawerContextData | undefined>(undefined)

export const DrawerContextProvider: React.FC<DrawerContextProviderProps> = ({
  children
}) => {
  const [selectedGif, setSelectedGif] = useState<GifObject | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DrawerContext.Provider
      value={{
        selectedGif,
        setSelectedGif,
        isDrawerOpen: isOpen,
        setIsDrawerOpen: setIsOpen
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDrawerContext = (): DrawerContextData => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error(
      'useDrawerContext must be used within a DrawerContextProvider'
    )
  }
  return context
}
