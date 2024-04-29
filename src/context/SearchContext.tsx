import React, { ReactNode, createContext, useContext, useState } from 'react'

export interface SearchContextData {
  submittedSearchTerm: string
  setSubmittedSearchTerm: (searchTerm: string) => void
}

export interface SearchContextProviderProps {
  children: ReactNode
}

const SearchContext = createContext<SearchContextData | undefined>(undefined)

export const SearchContextProvider: React.FC<SearchContextProviderProps> = ({
  children
}) => {
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(``)

  return (
    <SearchContext.Provider
      value={{
        submittedSearchTerm,
        setSubmittedSearchTerm
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = (): SearchContextData => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    )
  }
  return context
}
