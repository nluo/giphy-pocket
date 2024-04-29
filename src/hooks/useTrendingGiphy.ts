import { useQuery } from '@tanstack/react-query'

export const useTrendingGiphy = ({ numPerPage = 10 }) => {
  return useQuery({
    queryKey: [`trending-gifs`],
    queryFn: async () => {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY

      if (!apiKey) {
        throw new Error('Giphy API key is not provided')
      }
      const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${numPerPage}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('There are some issues with the request')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000
  })
}
