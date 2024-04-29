import React, { ReactNode, createContext, useContext, useState } from 'react'

interface PaginationContextData {
  page: number
  totalPages: number
  setPage: (pageCount: number) => void
  setTotalPages: (totalItems: number) => void
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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  return (
    <PaginationContext.Provider
      value={{
        page,
        totalPages,
        setPage,
        setTotalPages
      }}
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
