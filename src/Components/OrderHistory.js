// OrderHistoryPremium.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FiFileText, FiEye, FiChevronLeft, FiChevronRight, FiCreditCard } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {jwtDecode} from 'jwt-decode';
import axios from '../utility/axiosPathFiles/axios';

// Format currency
const formatCurrency = (v) =>
  v != null
    ? `₹${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

// Get user info
const token = localStorage.getItem('accessToken');
let userInfo = token ? jwtDecode(token) : {};

// Function to generate random professional order names
const generateOrderName = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `INV-${date}-${code}`;
};

export default function OrderHistoryPremium() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders
  useEffect(() => {
    axios.get('/getOrderDetail')
      .then((response) => {
        const mappedOrders = response.data.data.map(order => ({
          ...order,
          orderName: generateOrderName(),
        }));
        setOrders(mappedOrders);
      })
      .catch((error) => console.error(error));
  }, []);

  // --- Filtering ---
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders.slice();
    return orders.filter(
      (o) =>
        o.razorPayId.toLowerCase().includes(q) ||
        o.orderName.toLowerCase().includes(q) ||
        o.items.some((item) => item.productName?.toLowerCase().includes(q))
    );
  }, [orders, query]);

  // --- Sorting ---
  const sorted = useMemo(() => {
    const arr = filtered.slice();
    const { key, direction } = sortConfig;
    arr.sort((a, b) => {
      let A = a[key];
      let B = b[key];
      if (typeof A === "string") A = A.toLowerCase();
      if (typeof B === "string") B = B.toLowerCase();
      if (A > B) return direction === "asc" ? 1 : -1;
      if (A < B) return direction === "asc" ? -1 : 1;
      return 0;
    });
    return arr;
  }, [filtered, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const toggleSort = (key) => {
    setSortConfig((prev) => (prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }));
  };

  // --- Download Invoice ---
  const downloadInvoice = (order) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    // HEADER
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Print Nest", 40, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("123, Print Street, Pune, India", 40, 65);
    doc.text("Email: support@printnest.com | Phone: +91 9876543210", 40, 80);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", pageWidth - 40, 50, { align: "right" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${order.orderName}`, pageWidth - 40, 65, { align: "right" });
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, pageWidth - 40, 80, { align: "right" });

    // FROM / TO
    const fromY = 110;
    doc.setFont("helvetica", "bold"); doc.text("From:", 40, fromY);
    doc.setFont("helvetica", "normal");
    doc.text("Print Nest", 40, fromY + 15);
    doc.text("123, Print Street, Pune, India", 40, fromY + 30);
    doc.text("support@printnest.com | +91 9876543210", 40, fromY + 45);

    doc.setFont("helvetica", "bold"); doc.text("To:", pageWidth / 2 + 20, fromY);
    doc.setFont("helvetica", "normal");
    doc.text(userInfo?.OrgName || "Customer", pageWidth / 2 + 20, fromY + 15);

    // PRODUCTS TABLE
    const tableY = fromY + 70;
    const head = [["Product", "Qty", "Unit Price", "Total"]];
    const body = order.items.map(item => [
  item.productId?.productName || item.productId?._id,
  item.qty.toString(),
  `₹${(item.productId?.basePrice || 0).toFixed(2)}`,
  `₹${(item.qty * (item.productId?.basePrice || 0)).toFixed(2)}`
]);


    autoTable(doc, {
      head,
      body,
      startY: tableY,
      theme: "grid",
      headStyles: { fillColor: [6, 182, 186], textColor: 255, fontStyle: "bold" },
      styles: { fontSize: 10, cellPadding: 5 },
      margin: { left: 40, right: 40 },
      columnStyles: { 1: { halign: "center" }, 2: { halign: "right" }, 3: { halign: "right" } }
    });

    const finalY = doc.lastAutoTable?.finalY || tableY + 100;

    // SUMMARY
    const summaryX = pageWidth - 40;
    const lineHeight = 18;
    const labels = ["Payment Status:", "Order Status:", "Total Amount:", "Payment Type:"];
    const values = [
      order.paymentStatus.toUpperCase(),
      order.orderStatus,
      `₹${order.totalAmount.toFixed(2)}`,
      order.paymentType ? order.paymentType.toUpperCase() : "—"
    ];

    labels.forEach((label, i) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text(label, summaryX - 200, finalY + 20 + i * lineHeight);
      doc.setFont("helvetica", "bold");
      if (i === 0) {
        const status = values[i].toLowerCase();
        if (status === "paid") doc.setTextColor(0, 128, 0);
        else if (status === "pending") doc.setTextColor(255, 165, 0);
        else if (status === "failed") doc.setTextColor(255, 0, 0);
        else doc.setTextColor(0);
      } else doc.setTextColor(0);
      doc.text(values[i], summaryX, finalY + 20 + i * lineHeight, { align: "right" });
    });

    // FOOTER
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Thank you for choosing Print Nest!", 40, 780);
    doc.text("support@printnest.com | +91 9876543210", 40, 795);

    doc.save(`Invoice_${order.orderName}.pdf`);
  };

  // --- Modal ---
  const OrderModal = ({ order, onClose }) => {
    if (!order) return null;
    return (
      <div className="pt-20 fixed inset-0 z-40 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-start border-b pb-3">
            <h3 className="text-xl font-semibold">{order.orderName}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Products: {order.items.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-1"><FiCreditCard /> Payment: {order.paymentStatus}</p>
                <p className="text-sm text-gray-600">Order Status: {order.orderStatus}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1"><FiCreditCard /> Type: {order.paymentType || "—"}</p>
              </div>
            </div>

            <table className="w-full border text-sm mt-2">
              <thead className="bg-cyan-600 text-white">
                <tr>
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Unit Price</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2 border">{item.productId?.productName || item.productId?._id}</td>
                    <td className="p-2 border text-center">{item.qty}</td>
                    <td className="p-2 border text-right">{item.productId?.basePrice}</td>
                    <td className="p-2 border text-right">{(item.qty * (item.productId?.basePrice || 0)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-3 flex justify-end gap-6 text-sm font-semibold">
              <p>Total Products: {order.items.length}</p>
              <p>Total Amount: {formatCurrency(order.totalAmount)}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => downloadInvoice(order)}
              className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 flex items-center gap-2"
            >
              <FiFileText /> Download Invoice
            </button>
            <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-28 min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Order History</h1>
          <div className="flex items-center gap-3">
            <input
              className="outline-none border rounded px-3 py-2 text-sm w-72"
              placeholder="Search order / product..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
            <select value={pageSize} onChange={(e) => { setPageSize(+e.target.value); setPage(1); }} className="outline-none border rounded px-3 py-2 text-sm">
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cyan-600 text-white">
              <tr>
                <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort("orderName")}>Invoice No</th>
                <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort("createdAt")}>Invoice Date</th>
                <th className="p-3 text-right">Total</th>
                <th className="p-3 text-center">Total Products</th>
                <th className="p-3 text-center">Payment</th>
                <th className="p-3 text-center">Payment Type</th>
                <th className="p-3 text-center">Order Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.orderName}</td>
                  <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-3 text-right font-semibold">{formatCurrency(order.totalAmount)}</td>
                  <td className="p-3 text-center">{order.items.length}</td>
                  <td className="p-3 text-center">{order.paymentStatus}</td>
                  <td className="p-3 text-center">{order.paymentType || "—"}</td>
                  <td className="p-3 text-center">{order.orderStatus}</td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    <button onClick={() => setSelectedOrder(order)} className="bg-white border px-2 py-1 rounded hover:shadow"><FiEye /></button>
                    <button onClick={() => downloadInvoice(order)} className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 flex items-center gap-2"><FiFileText /> Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sorted.length === 0 && <div className="p-8 text-center text-gray-600">No orders found.</div>}

          <div className="p-4 flex items-center justify-between border-t">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, sorted.length)} of {sorted.length}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded bg-white border hover:shadow disabled:opacity-50"><FiChevronLeft /></button>
              <div className="text-sm">Page <span className="mx-2 font-medium">{page}</span> of {totalPages}</div>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded bg-white border hover:shadow disabled:opacity-50"><FiChevronRight /></button>
            </div>
          </div>
        </div>

        {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      </div>
    </div>
  );
}