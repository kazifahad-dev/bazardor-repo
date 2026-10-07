const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


async function fetchData(path) {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    return null; 
  }
  return res.json();
}


export function getProducts(category) {
  const query = category ? `?category=${category}` : "";
  return fetchData(`/products${query}`);
}


export function getProduct(id) {
  return fetchData(`/products/${id}`);
}


export function getCategories() {
  return fetchData("/categories");
}


export function getCategory(slug) {
  return fetchData(`/categories/${slug}`);
}