import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ProductCard({ product }) {
  const lowStock = parseInt(product.qty) <= parseInt(product.threshold);
  const data = [{ name: "Stock", qty: parseInt(product.qty) }];

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "1rem",
        width: "250px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <h3>{product.name}</h3>
      <p>
        Stock: {product.qty}/{product.max_capacity}
        {lowStock && (
          <span style={{ color: "red", fontWeight: "bold" }}> ⚠️ Low Stock</span>
        )}
      </p>
      <p>Zone: {product.zone}</p>
      <p>Shelf: {product.shelf}</p>

      <BarChart width={220} height={150} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="qty" fill={lowStock ? "#f87171" : "#4ade80"} />
      </BarChart>
    </div>
  );
}
