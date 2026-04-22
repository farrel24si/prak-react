// Generate 30 Data Customers
export const customersData = Array.from({ length: 30 }).map((_, index) => ({
    id: `CUST-${1000 + index}`,
    name: `Customer ${index + 1}`,
    email: `user${index + 1}@gmail.com`,
    phone: `081234567${index.toString().padStart(3, '0')}`,
    loyalty: index % 4 === 0 ? "Gold" : index % 2 === 0 ? "Silver" : "Bronze"
}));

// Generate 30 Data Orders
const statuses = ["Pending", "Completed", "Cancelled"];
export const ordersData = Array.from({ length: 30 }).map((_, index) => ({
    id: `ORD-2026${index.toString().padStart(3, '0')}`,
    customerName: `Customer ${Math.floor(Math.random() * 30) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    totalPrice: (Math.random() * 500000 + 50000).toFixed(0),
    orderDate: `2026-04-${(index % 28 + 1).toString().padStart(2, '0')}`
}));