import Dashboard from "@/components/module/Dashboard/main/Dashboard";
// import MainDashboardContent from "@/components/module/Dashboard/main/DashboardContent";
import { getMetaData } from "@/components/services/meta/metaDataFetching";



const AdminDashboard = async() => {
const metaData = await getMetaData();
// console.log(metaData)
   return (
      <div>
         {/* <MainDashboardContent/> */}
         <Dashboard data={metaData?.data} />
      </div>
   );
};

export default AdminDashboard;