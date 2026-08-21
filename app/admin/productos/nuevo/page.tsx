import ProductForm from "@/components/admin/ProductForm";

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Nuevo producto</h1>
      <div className="mt-8">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}