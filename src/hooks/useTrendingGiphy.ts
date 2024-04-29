import { useQuery } from '@tanstack/react-query'
import { GiphyTrendingResponse } from '../api-types'

export const useGiphyPagination = (
  pageNum: number,
  numPerPage = 10,
  query = ``
) => {
  return useQuery({
    queryKey: [`gifs`, pageNum, query],
    queryFn: async (): Promise<GiphyTrendingResponse> => {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY

      if (!apiKey) {
        throw new Error('Giphy API key not found!')
      }
      const offset = (pageNum - 1) * numPerPage
      const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${numPerPage}&offset=${offset}`

      const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${numPerPage}&offset=${offset}`

      const url = query.length > 0 ? searchUrl : trendingUrl
      const response = await fetch(url)
      if (response.status === 429) {
        throw new Error('Giphy API Rate limit exceeded!')
      }
      if (!response.ok) {
        throw new Error('There are some issues with the request')
      }
      return response.json()
    },
    staleTime: 1 * 60 * 1000
  })
}
