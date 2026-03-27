export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('OK');
  const { status, item_name, reference } = req.body;

  if (status === 'PAID') {
    const ramSize = parseInt(item_name.replace(/[^0-9]/g, '')) || 1;
    const ramMB = item_name.toLowerCase().includes('unlimited') ? 32768 : ramSize * 1024;

    await fetch(`${process.env.PTERO_URL}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PTERO_APP_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: `User-${reference}`,
        user: 1, // Ganti ID User jika perlu
        egg: 15, // Ganti ID Egg sesuai panelmu
        docker_image: "ghcr.io/pterodactyl/yolks:nodejs_18",
        startup: "node index.js",
        limits: { memory: ramMB, swap: 0, disk: 10240, io: 500, cpu: 100 },
        feature_limits: { databases: 1, backups: 1, allocations: 1 },
        deploy: { locations: [1], dedicated_ip: false, port_range: [] }
      })
    });
    return res.status(200).json({ success: true });
  }
  res.status(200).send('OK');
}
