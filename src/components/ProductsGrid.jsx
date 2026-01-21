import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchProducts,setCategory,setPage,setQuery,setSort,} from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice"; 

function formatINR(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-[4/3] w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-9 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const image = product?.images?.[0];

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {image ? (
          <img
            src={image}
            alt={product?.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-semibold">
            {product?.title}
          </h3>
          <div className="text-base font-bold">
            {formatINR(product?.price)}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {product?.description}
        </p>

        <div className="mt-4">
          <button
            type="button"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            onClick={() => dispatch(addToCart(product))} 
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsGrid() {
  const dispatch = useDispatch();
  const { items, loading, error, page, pageSize, query, category, sort } =
    useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  const categories = useMemo(() => {
    const set = new Set(items.map((p) => p?.category?.name).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    let list = [...items];
    const q = query.trim().toLowerCase();

    if (category !== "all") {
      list = list.filter((p) => p?.category?.name === category);
    }

    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [items, query, category, sort]);

  const canGoPrev = page > 1;
  const canGoNext = !loading && items.length === pageSize;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Redux Toolkit + Axios • 10 per page • INR
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-12 dark:bg-zinc-950">
          <div className="md:col-span-5">
            <label className="text-xs font-medium">Search</label>
            <input
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Search products..."
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium">Sort</label>
            <select
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium">Page size</label>
            <input
              readOnly
              value={pageSize}
              className="mt-1 w-full rounded-xl border bg-zinc-100 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <div>
            {loading ? "Loading…" : `${filtered.length} items • Page ${page}`}
          </div>

          <div className="flex gap-2">
            <button
              disabled={!canGoPrev}
              onClick={() => dispatch(setPage(page - 1))}
              className="rounded-xl border px-4 py-2 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={!canGoNext}
              onClick={() => dispatch(setPage(page + 1))}
              className="rounded-xl border px-4 py-2"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {loading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
        </div>

        {error && (
          <div className="mt-6 text-red-600">{error}</div>
        )}
      </div>
    </div>
  );
}
