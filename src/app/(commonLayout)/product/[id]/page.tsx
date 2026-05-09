import ProductDetails from "@/components/module/product/productDtails";
import { getProductById, getProducts } from "@/components/services/product/ProductFetching";
import { CardItem } from "@/Types/product.interface";
import React from "react";

interface ProductDetailsProps {
   product: CardItem;
}

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = await params;
   const result = await getProductById(id); // Fetch the product by ID
   // You would typically fetch the product data based on the ID here
   // For now, we'll assume the product data is available in the `product` variable

   return (
      <div>
         <ProductDetails product={result?.data} />
      </div>
   );
};

export default ProductDetailsPage;
