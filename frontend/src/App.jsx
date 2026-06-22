import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    title: "", description: "", type: "lost", location: "", contact: ""
  });

  const fetchItems = async () => {
    const res = await fetch("${import.meta.env.VITE_API_URL}/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.location || !form.contact) {
      alert("Please fill title, location and contact!");
      return;
    }
    await fetch("${import.meta.env.VITE_API_URL}/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ title: "", description: "", type: "lost", location: "", contact: "" });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const filtered = filter === "all" ? items : items.filter(i => i.type === filter);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px", fontFamily: "Arial", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #4a90e2, #7b2ff7)", borderRadius: "16px", padding: "20px", textAlign: "center", marginBottom: "20px", color: "white" }}>
        <div style={{ fontSize: "48px", marginBottom: "8px" }}>🏫</div>
<h1 style={{ margin: 0, fontSize: "24px" }}>Campus Tracker</h1>
<p style={{ margin: "5px 0 0", fontSize: "14px", opacity: 0.9 }}>NRIIT Campus Lost & Found</p>
      </div>

      {/* Form */}
      <div style={{ background: "white", borderRadius: "16px", padding: "20px", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        <h2 style={{ margin: "0 0 15px", fontSize: "18px", color: "#333" }}>📋 Report an Item</h2>
        
        <input placeholder="Item Title *" value={form.title}
          onChange={e => setForm({...form, title: e.target.value})}
          style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }} />
        
        <textarea placeholder="Description" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box", height: "80px", resize: "none" }} />
        
        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
          style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}>
          <option value="lost">🔴 Lost</option>
          <option value="found">🟢 Found</option>
        </select>
        
        <input placeholder="Location *" value={form.location}
          onChange={e => setForm({...form, location: e.target.value})}
          style={{ width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }} />
        
        <input placeholder="Contact Number *" value={form.contact}
          onChange={e => setForm({...form, contact: e.target.value})}
          style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }} />
        
        <button onClick={handleSubmit}
          style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #4a90e2, #7b2ff7)", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
          Submit Report
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        {["all", "lost", "found"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", fontWeight: "bold", fontSize: "14px", cursor: "pointer",
              background: filter === f ? "linear-gradient(135deg, #4a90e2, #7b2ff7)" : "white",
              color: filter === f ? "white" : "#555",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }}>
            {f === "all" ? "All" : f === "lost" ? "🔴 Lost" : "🟢 Found"}
          </button>
        ))}
      </div>

      {/* Items List */}
      <h2 style={{ fontSize: "18px", color: "#333", marginBottom: "10px" }}>📦 Items ({filtered.length})</h2>
      {filtered.length === 0 && <p style={{ textAlign: "center", color: "#999" }}>No items found!</p>}
      {filtered.map(item => (
        <div key={item._id} style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", borderLeft: `4px solid ${item.type === "lost" ? "#e74c3c" : "#2ecc71"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>{item.title}</span>
            <span style={{ background: item.type === "lost" ? "#ffe0e0" : "#e0ffe0", color: item.type === "lost" ? "#e74c3c" : "#27ae60", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
              {item.type === "lost" ? "🔴 LOST" : "🟢 FOUND"}
            </span>
          </div>
          {item.description && <p style={{ margin: "0 0 8px", color: "#666", fontSize: "14px" }}>{item.description}</p>}
          <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#888" }}>📍 {item.location}</p>
          <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#888" }}>📞 {item.contact}</p>
          <button onClick={() => handleDelete(item._id)}
            style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "6px", fontSize: "13px", cursor: "pointer" }}>
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;