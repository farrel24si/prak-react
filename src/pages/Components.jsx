import React from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Badge from "../components/Badge";     // Import baru
import Container from "../components/Container"; // Import baru
import Footer from "../components/Footer";       // Import baru
import Table from "../components/Table";         // Import baru

export default function Components() {
  // Data dummy untuk Table
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 pb-20">
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

      <p className="text-gray-600 mb-8 font-medium">Ini Halaman Components Lengkap Sesuai Modul 10</p>

      {/* --- BASIC COMPONENTS --- */}
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">1. Basic Components</h2>
      
      <h3 className="text-sm font-semibold text-gray-500 mb-2 mt-4">Button:</h3>
      <div className="flex gap-2 mb-4">
        <Button type="primary">Primary</Button>
        <Button type="success">Simpan</Button>
        <Button type="danger">Hapus</Button>
      </div>

      <h3 className="text-sm font-semibold text-gray-500 mb-2 mt-4">Badge:</h3>
      <div className="flex gap-2 mb-4">
        <Badge type="primary">New</Badge>
        <Badge type="success">Selesai</Badge>
        <Badge type="warning">Pending</Badge>
      </div>

      <h3 className="text-sm font-semibold text-gray-500 mb-2 mt-4">Avatar:</h3>
      <div className="flex gap-2 mb-8">
        <Avatar name="Fikri" />
        <Avatar name="Hendra" />
        <Avatar name="Suci" />
      </div>

      {/* --- DATA DISPLAY COMPONENTS --- */}
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">2. Data Display Components</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Card Biasa:</h3>
          <Card>
            <h2 className="text-xl font-bold text-gray-800">Judul Card</h2>
            <p className="text-gray-600 mt-2">Ini adalah isi dari card standar.</p>
          </Card>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Product Card:</h3>
          <ProductCard
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            title="Sepatu Sport"
            category="Fashion"
            price="Rp 450.000"
            description="Sepatu sport modern dengan desain nyaman."
          />
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-500 mb-2">Table:</h3>
      <div className="mb-8 bg-white p-2 rounded-xl">
        <Table headers={headers}>
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
              <td className="px-4 py-3">
                <Badge type="secondary">{product.category}</Badge>
              </td>
              <td className="px-4 py-3">{product.price}</td>
              <td className="px-4 py-3">
                <Button type="primary">Detail</Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* --- LAYOUT COMPONENTS --- */}
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">3. Layout Components</h2>
      
      <h3 className="text-sm font-semibold text-gray-500 mb-2 mt-4">Container & Footer:</h3>
      <div className="border-4 border-dashed border-gray-200 rounded-xl bg-gray-50">
        <Container>
          <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Simulasi Isi Container</h1>
          <p className="text-gray-600 text-center mb-6">Container membungkus konten agar posisinya di tengah (mx-auto).</p>
          <Footer />
        </Container>
      </div>

    </div>
  );
}