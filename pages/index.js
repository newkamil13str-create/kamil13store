import React from 'react';

const packages = [
  { ram: '1GB', price: 2000, color: 'from-blue-500' },
  { ram: '2GB', price: 3000, color: 'from-blue-600' },
  { ram: '4GB', price: 5000, color: 'from-indigo-500', badge: 'Best Seller' },
  { ram: '8GB', price: 9000, color: 'from-purple-500' },
  { ram: '10GB', price: 11000, color: 'from-pink-500' },
  { ram: 'UNLIMITED', price: 15000, color: 'from-orange-500', badge: 'Ultra' },
];

export default function KamilStore() {
  const handleOrder = async (ram, price) => {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ram, price })
    });
    const data = await res.json();
    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("Gagal membuat pesanan, cek koneksi!");
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen p-6 font-sans">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">KAMIL13 STR</h1>
        <a href="https://private.fyxzpedia.biz.id" className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold">Login Panel</a>
      </nav>

      <div className="text-center my-16">
        <h2 className="text-4xl font-extrabold mb-2 text-white">Panel Pterodactyl <span className="text-cyan-400 font-black">Instan</span></h2>
        <p className="text-gray-400">Bayar via QRIS Pakasir, Panel langsung jadi otomatis!</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <div key={i} className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 hover:border-cyan-500 transition relative">
            {pkg.badge && <span className="absolute top-4 right-4 bg-red-500 text-[10px] px-2 py-1 rounded-full">{pkg.badge}</span>}
            <h3 className="text-xl font-bold">RAM {pkg.ram}</h3>
            <p className="text-2xl font-black my-4 text-cyan-400">Rp{pkg.price.toLocaleString()}</p>
            <ul className="text-sm text-gray-400 space-y-2 mb-6">
              <li>✅ CPU 100% Core</li>
              <li>✅ Disk 10GB NVMe</li>
              <li>✅ Lokasi Global</li>
            </ul>
            <button onClick={() => handleOrder(pkg.ram, pkg.price)} className={`w-full py-3 rounded-xl font-bold bg-gradient-to-r ${pkg.color} to-cyan-500`}>
              Beli Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
