export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { namaSantri, kelas, poinBSB, poinPerhatian, hasMB } = req.body;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const namaPertama = (namaSantri || 'Ananda').split(' ')[0];
  const bsbList     = poinBSB?.length     ? poinBSB.join(', ')      : '-';
  const perhatianList = poinPerhatian?.length ? poinPerhatian.join(', ') : '-';
  const perhatianLabel = hasMB
    ? 'masih dalam tahap Mulai Berkembang'
    : 'perlu mendapat perhatian dan pendampingan lebih';

  const prompt = `Kamu adalah musyrifah KB-TK Tarbiyah Qur'aniyah yang menulis catatan dan rekomendasi untuk orang tua santri di rapor.

Data santri:
- Nama: ${namaPertama}
- Kelas: ${kelas}
- Poin yang Berkembang Sangat Baik (BSB): ${bsbList}
- Poin yang ${perhatianLabel}: ${perhatianList}

Tulis 1 paragraf catatan dan rekomendasi yang:
- Diawali "Alhamdulillah" atau "MasyaAllah"
- Menyebut poin BSB yang menonjol (gunakan nama poin-nya)
- Mengajak orang tua untuk mendampingi poin yang perlu perhatian, tanpa kata "kurang/lemah/gagal/belum"
- Ditutup dengan doa/harapan yang hangat
- Panjang 60–80 kata, nada hangat dan personal seperti musyrifah yang peduli

Kembalikan HANYA teks paragrafnya, tanpa label, tanpa tanda petik.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Groq error: ' + err });
    }

    const data = await response.json();
    const catatan = data.choices[0].message.content.trim();
    return res.status(200).json({ catatan });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
