module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { poin, level, evidence, namaSantri, kelas } = req.body || {};
  if (!poin || !level) return res.status(400).json({ error: 'poin dan level wajib diisi' });

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) return res.status(500).json({ error: 'API key belum dikonfigurasi' });

  const levelFull = { MB:'Mulai Berkembang', BCB:'Berkembang Cukup Baik', BSB:'Berkembang Sangat Baik' }[level] || level;
  const prompt = 'Kamu adalah Musyrifah di KB-TK Tarbiyah Quraniyah (TaQi). Tulis narasi rapor.\n\nATURAN:\n1. Mulai dengan Alhamdulillah atau MasyaAllah\n2. Pola: PENCAPAIAN - BUKTI - INSIGHT - DOA\n3. Panjang: 60-120 kata\n4. DILARANG: kurang, lemah, gagal, buruk\n5. Tutup dengan Semoga\n6. Sebut Ananda [nama pertama]\n\nDATA: Nama=' + (namaSantri||'Santri') + ', Kelas=' + (kelas||'TK') + ', Poin=' + poin + ', Level=' + levelFull + ', Evidence=' + (evidence||'-') + '\n\nTulis narasi:';

  try {
    const https = require('https');
    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 350 },
    });
    const narasi = await new Promise((resolve, reject) => {
      const opts = {
        hostname: 'generativelanguage.googleapis.com',
        path: '/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) },
      };
      const r = https.request(opts, (resp) => {
        let data = '';
        resp.on('data', (c) => { data += c; });
        resp.on('end', () => {
          try {
            const p = JSON.parse(data);
            if (p.error) { reject(new Error('Gemini: ' + p.error.message)); return; }
            const t = p.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (t) resolve(t);
            else reject(new Error('No text in response: ' + data.substring(0, 300)));
          } catch(e) { reject(new Error('Parse error: ' + data.substring(0, 200))); }
        });
      });
      r.on('error', (e) => reject(new Error('HTTPS error: ' + e.message)));
      r.write(postData);
      r.end();
    });
    return res.status(200).json({ narasi });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
