import React, { ReactNode, createContext, useContext, useState } from 'react'

interface PaginationContextData {
  pageCount: number
  totalItems: number
  setPageCount: (pageCount: number) => void
  setTotalItems: (totalItems: number) => void
}

const PaginationContext = createContext<PaginationContextData | undefined>(
  undefined
)

export interface PaginationContextProviderProps {
  children: ReactNode
}

export const PaginationProvider: React.FC<PaginationContextProviderProps> = ({
  children
}) => {
  const [pageCount, setPageCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  return (
    <PaginationContext.Provider
      value={{ pageCount, totalItems, setPageCount, setTotalItems }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePaginationContext = (): PaginationContextData => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error(
      'usePaginationContext must be used within a PaginationProvider'
    )
  }
  return context
}
