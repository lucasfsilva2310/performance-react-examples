import { useMemo } from 'react'
import { List, ListRowRenderer } from 'react-virtualized'
import { ProductItem } from './ProductItem'

interface SearchResultsProps {
  results: Array<{
    id: number
    price: number
    title: string
  }>
  onAddToWishList: (id: number) => void
}

export function SearchResults({
  results,
  onAddToWishList,
}: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price
    }, 0)
  }, [results])

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    )
  }

  return (
    <div>
      <span>Total: {totalPrice}</span>

      <List
        height={300} //Fixed height, but we can uso AutoSize import to set component to whole screen
        rowHeight={30} //lineHeight basically
        width={900}
        overscanRowCount={5} // How many rows we want to have ABOVE the screen limit
        rowCount={results.length} // How many items are there
        rowRenderer={rowRenderer} //function that will render each list item
      />
      {/* {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        )
      })} */}
      {/* We could directly use the component, but with this lib we optimize the app by only rendering
      itens that are visible on screen at first render */}
    </div>
  )
}
