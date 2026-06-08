// import ProductCarousel from '@/components/module/product/HeroProductCarousel';
import CardSection from '@/components/module/product/CardSection';
import HeroProductCarousel from '@/components/module/product/HeroProductCarousel';
import { getProducts } from '@/components/services/product/ProductFetching';
import React from 'react';

const page = async () => {
   const products = await getProducts();
   // console.log(products)
   return (
      <div>
         <HeroProductCarousel products={products?.data?.data} />
         <CardSection products={products?.data?.data} />
      </div>
   );
};

export default page;