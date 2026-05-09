// import Expertise from "@/components/modules/home/Expertise";
// import Hero from "@/components/modules/home/Hero";
// import ViewReview from "@/components/modules/home/Review";
// import SupportComponent from "@/components/modules/home/Support";
// import ServicesSection from "@/components/modules/home/Support";

import Expertise from "@/components/module/home/Expertise";
import Hero from "@/components/module/home/Hero";
import HomeProductCard from "@/components/module/home/HomeProductCard";
import SupportComponent from "@/components/module/home/SupportComponent";
import ViewReview from "@/components/module/home/ViewReview";

// import TestPage from "@/components/shared/Test";

const commonPage = () => {
   return (
      <div>
         <Hero></Hero>
         <Expertise></Expertise>
         <SupportComponent
            title="15 Years of Dedicated Support"
            subtitle="Serving businesses since 2009"
            description="Our journey began in 2009 with a simple mission: provide unparalleled technical support. Today, we serve Fortune 500 companies with the same dedication and expertise that started it all."
            yearsOfExperience={15}
            imageUrl="/our-support-team.jpg"
         />
         <HomeProductCard></HomeProductCard>
         <ViewReview></ViewReview>
      </div>
   );
};

export default commonPage;
