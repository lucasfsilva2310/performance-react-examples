module.exports = () => {
  // Creating artificial API with json-server
  console.log('Starting artifical server')

  const data = {
    products: [],
  }
  const itemsQuantity = 1000

  console.log(`Creating ${itemsQuantity} items`)

  for (let i = 0; i < itemsQuantity; i++) {
    data.products.push({
      id: i + 1,
      price: 80,
      title: `Camiseta ${i + 1}`,
    })
  }
  console.log('Returning all items')

  return data
}
