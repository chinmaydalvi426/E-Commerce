import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/product-card";
import ProductFilter from "@/components/product-filter";
import type { Product } from "@/lib/types";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; minPrice?: string; maxPrice?: string }>;
}) {
  // Await searchParams to resolve the Promise
  const { category, sort, minPrice, maxPrice } = await searchParams;

  // Add error handling for data fetching
  let products: Product[] = [];
  try {
    // Fetch products with category and price filters
    products = await fetchProducts(
      category,
      minPrice ? parseFloat(minPrice) : undefined,
      maxPrice ? parseFloat(maxPrice) : undefined
    );

    // Sort products if sort parameter is provided
    if (sort) {
      products = [...products].sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        return 0; // Default: no sorting
      });
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Continue with empty products array
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s` : "All"} Products
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilter />
        </aside>

        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}