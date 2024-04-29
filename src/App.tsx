import { useTrendingGiphy } from './hooks/useTrendingGiphy'
function App() {
  const { data, error, isLoading } = useTrendingGiphy({
    numPerPage: 10
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return JSON.stringify(data)
}

export default App
