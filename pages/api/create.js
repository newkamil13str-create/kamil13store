export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const { ram, price } = req.body;

  const response = await fetch('https://pakasir.com/api/v1/create-invoice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': process.env.PAKASIR_API_KEY },
    body: JSON.stringify({
      slug: process.env.PAKASIR_SLUG,
      amount: price,
      item_name: `Panel ${ram}`,
      customer_name: "Customer Kamil13",
      callback_url: `https://${req.headers.host}/api/webhook`
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
