module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { poin, level, evidence, namaSantri, kelas } = req.body || {};
  if (!poin || !level) return res.status(400).json({ error: 'poin dan level wajib diisi' });

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) return res.status(500).json({ error: 'API key belum dikonfigurasi' });

  const levelFull = { MB: 'Mulai Berkembang', BCB: 'Berkembang Cukup Baik', BSB: 'Berkembang Sangat Baik' }[level] || level;

  const prompt = `Kamu adalah Musyrifah (guru) di KB-TK Tarbiyah Qur'aniyah (TaQi), sekolah Islam berbasis karakter Qur'ani. Tugasmu menulis narasi rapor perkembangan santri yang hangat, personal, dan Islami.

ATURAN WAJIB:
1. Mulai dengan "Alhamdulillah" atau "MasyaAllah"
2. Pola narasi: PENCAPAIAN -> BUKTI NYATA -> INSIGHT PERKEMBANGAN -> HARAPAN & DOA
3. Panjang: 60-120 kata (tidak lebih, tidak kurang)
4. DILARANG menggunakan kata: kurang, lemah, gagal, buruk, tidak bisa, belum mampu, masih kesulitan
5. Jika ada hal yang perlu ditingkatkan, ungkapkan HANYA sebagai harapan/doa di akhir
6. Tutup dengan "Semoga..." atau kalimat doa
7. Bahasa hangat, personal - seperti Musyrifah yang benar-benar mengenal dan menyayangi santrinya
8. Sebut santri dengan "Ananda [nama pertama]"
9. Boleh menyebut nama Allah, Rasulullah, atau kutipan Islami yang relevan

DATA SANTRI:
- Nama: ${namaSantri}
- Kelas: ${kelas}
- Poin Penilaian: ${poin}
- Tingkat Perkembangan: ${levelFull} (${level})
- Catatan Evidence: ${evidence || '(tidak ada catatan khusus, tulis narasi umum yang sesuai dengan level)'}

Tulis HANYA narasi rapor (tanpa judul, tanpa penjelasan tambahan):`;

  try {
    const https = require('https');
    const postData = JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 350,
      temperature: 0.8,
    });

    const narasi = await new Promise((resolve, reject) => {
      const opts = {
        hostname: 'api.groq.com',
        path: '/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + GROQ_API_KEY,
          'Content-Length': Buffer.byteLength(postData),
        },
      };
      const r = https.request(opts, (resp) => {
        let data = '';
        resp.on('data', (c) => { data += c; });
        resp.on('end', () => {
          try {
            const p = JSON.parse(data);
            if (p.error) { reject(new Error('Groq: ' + p.error.message)); return; }
            const t = p.choices?.[0]?.message?.content?.trim();
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
