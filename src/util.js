export default function formatCurrency(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
  }

  export function sortByPrice(sort, products) {
      return {
            sort,
            products: products
                        .slice()
                        .sort((a, b) => (
                            sort === "lowest" ? a.price > b.price ? 1 : -1
                            : (sort === "highest") ? a.price > b.price ? -1 : 1
                            : a._id > b._id ? 1 : -1
                        ))

      }
  }