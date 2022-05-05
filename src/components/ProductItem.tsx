import { memo, useState, lazy, Suspense } from 'react' // lazy or dynamic on Next

const AddProductToWishList: any = lazy(() => {
  return import('./AddProductToWishList').then(
    ({ default: AddProductToWishList }) => ({
      default: AddProductToWishList,
    })
  )
})

interface ProductItemProps {
  product: {
    id: number
    price: number
    title: string
  }
  onAddToWishList: (id: number) => void
}

export function ProductItem({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <Suspense fallback={<span>Carregando...</span>}>
          <AddProductToWishList
            onAddToWishList={() => onAddToWishList(product.id)}
            onRequestClose={() => setIsAddingToWishList(false)}
          />
        </Suspense>
      )}
    </div>
  )
}

export const ProductItemMemo = memo(ProductItem, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
})
