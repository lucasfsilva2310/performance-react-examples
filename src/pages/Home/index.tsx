import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../../components/SearchResult'

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    // checking if has any type of input other than blank space
    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    setResults(data)
  }

  const onAddToWishList = useCallback(() => {
    return async (id: number) => {
      console.log(id)
    }
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <SearchResults results={results} onAddToWishList={onAddToWishList} />
    </div>
  )
}
