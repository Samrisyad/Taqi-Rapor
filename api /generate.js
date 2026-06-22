module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { poin, level, evidence, namaSantri, kelas } = req.body || {};

  if (!poin || !level) {
    return res.status(400).json({ error: 'poin dan level wajib diisi' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key belum dikonfigurasi di server' });
  }

  const levelFull = {
    MB:  'Mulai Berkembang',
    BCB: 'Berkembang Cukup Baik',
    BSB: 'Berkembang Sangat Baik',
  }[level] || level;

  const prompt = `Kamu adalah Musyrifah (guru) di KB-TK Tarbiyah Qur'aniyah (TaQi), sekolah Islam berbasis karakter Qur'ani. Tugasmu menulis narasi rapor perkembangan santri yang hangat, personal, dan Islami.

ATURAN WAJIB:
1. Mulai dengan "Alhamdulillah" atau "MasyaAllah"
2. Pola narasi: PENCAPAIAN → BUKTI NYATA → INSIGHT PERKEMBANGAN → HARAPAN & DOA
3. Panjang: 60-120 kata (tidak lebih, tidak kurang)
4. DILARANG menggunakan kata: kurang, lemah, gagal, buruk, tidak bisa, belum mampu, masih kesulitan
5. Jika ada hal yang perlu ditingkatkan, ungkapkan HANYA sebagai harapan/doa di akhir
6. Tutup dengan "Semoga..." atau kalimat doa
7. Bahasa hangat, personal seperti Musyrifah yang menyayangi santrinya
8. Sebut santri dengan "Ananda [nama pertama]"

DATA SANTRI:
- Nama: ${namaSantri}
- Kelas: ${kelas}
- Mata Pelajaran / Poin Penilaian: ${poin}
- Tingkat Perkembangan: ${levelFull} (${level})
- Catatan Evidence dari Musyrifah: ${evidence || '(tidak ada catatan khusus, tulis narasi umum yang sesuai dengan level)'}

Tulis HANYA narasi rapor (tanpa judul, tanpa penjelasan tambahan):`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 350, topP: 0.9 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'Gemini API error: ' + errText });
    }

    const data = await response.json();
    const narasi = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!narasi) return res.status(500).json({ error: 'Tidak ada respons dari AI, coba lagi.' });

    return res.status(200).json({ narasi });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
