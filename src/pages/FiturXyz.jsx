import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/Badge";



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
      <Button>SIMPAN</Button>
      <Button variant="outline" size="xs">SIMPAN</Button>

            <Card className="mt-4 w-[380px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Belajar shadcn/ui</CardTitle>
            <Badge variant="secondary">Baru</Badge>
          </div>
          <CardDescription>
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Komponen ini dibuat di branch <strong>setup-shadcn</strong>
            lalu di-merge ke main.
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button>Simpan</Button>
          <Button variant="outline">Batal</Button>
        </CardFooter>
      </Card>
      </div>

      
  );
}