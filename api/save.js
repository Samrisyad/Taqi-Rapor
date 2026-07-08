export default async function handler(req, res) {
  // Allow CORS from frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) return res.status(500).json({ error: 'APPS_SCRIPT_URL not configured' });

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(req.body),
      redirect: 'follow'
    });
    const text = await response.text();
    return res.status(200).json({ ok: true, appsScriptResponse: text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
