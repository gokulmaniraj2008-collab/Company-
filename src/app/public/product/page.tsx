import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/SectionHeading";
import { Package } from "lucide-react";

export const revalidate = 60;

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_public", true)
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Products"
        title="What we're building"
        description="Real products, built using the same operating system you're looking at right now."
      />

      {products && products.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="surface rounded-2xl p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-crimson-600/10 text-crimson-500">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">
                {product.name}
              </h3>
              {product.tagline && (
                <p className="mt-1 text-sm font-medium text-crimson-400">
                  {product.tagline}
                </p>
              )}
              {product.description && (
                <p className="mt-4 text-sm leading-relaxed text-ink-400">
                  {product.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="surface mt-16 rounded-2xl p-12 text-center">
          <p className="text-base text-ink-400">
            Our product lineup is being finalized — check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
