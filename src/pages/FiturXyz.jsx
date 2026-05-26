import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function FiturXyz() {
  const stats = [
    { id: 1, label: "Total Orders", value: "75", icon: <FaShoppingCart />, color: "bg-hijau", trend: "4% (30 days)" },
    { id: 2, label: "Total Delivered", value: "357", icon: <FaTruck />, color: "bg-biru", trend: "4% (30 days)" },
    { id: 3, label: "Total Canceled", value: "65", icon: <FaBan />, color: "bg-merah", trend: "25% (30 days)" },
    { id: 4, label: "Total Revenue", value: "$128", icon: <FaDollarSign />, color: "bg-black", trend: "12% (30 days)" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50">
      <PageHeader />
      <p> =Halaman fitur xyz=</p>
      
     
      
      </div>
  );
}