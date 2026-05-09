import ProductCarousel from '@/components/ui/carousel';
import { CardItem } from '@/Types/product.interface';
import React from 'react';

const HeroProductCarousel = ({ products }: { products: CardItem[] }) => {
   return (
      <div>
         <ProductCarousel products={products} />
      </div>
   );
};

export default HeroProductCarousel;