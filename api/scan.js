export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `Kamu adalah sistem OCR untuk lembar penilaian santri KB-TK Tarbiyah Qur'aniyah.

Baca gambar lembar penilaian ini dan ekstrak data berikut dalam format JSON.

PENTING:
- Level penilaian hanya 3 kemungkinan: "MB", "BCB", atau "BSB". Jangan tulis lain.
- Jika tidak terbaca / tidak ada, isi dengan null.
- Untuk nama domain, cocokkan dengan daftar di bawah (boleh fuzzy match).

Format JSON yang harus dikembalikan (HANYA JSON, tanpa teks lain):
{
  "santri": {
    "nama": "",
    "nis": "",
    "nipd": "",
    "kelas": "",
    "semester": "",
    "tahunAjaran": "",
    "cabang": ""
  },
  "presensi": {
    "sakit": null,
    "izin": null,
    "tanpaKeterangan": null
  },
  "catatanMusyrifah": "",
  "penilaian": {
    "akhlakGuru": null,
    "akhlakTeman": null,
    "kemandirian": null,
    "kedisiplinan": null,
    "karakterKekhalifahan": null,
    "sosialEmosional": null,
    "tahfidzQuran": null,
    "tahsin": null,
    "hadits": null,
    "doa": null,
    "asmaulHusna": null,
    "syairIslami": null,
    "tauhid": null,
    "fiqih": null,
    "adabAkhlaq": null,
    "materiTema": null,
    "bahasa": null,
    "kognitif": null,
    "motorik": null,
    "kreatifitas": null
  }
}

Panduan mapping nama kolom di lembar ke key JSON:
- "Akhlak Guru" / "Akhlak Kepada Guru" → akhlakGuru
- "Akhlak Teman" / "Akhlak Kepada Teman" → akhlakTeman
- "Kemandirian" → kemandirian
- "Kedisiplinan" → kedisiplinan
- "Kekhalifahan" / "Karakter Kekhalifahan" → karakterKekhalifahan
- "Sosial Emosional" → sosialEmosional
- "Tahfidz" / "Tahfidz Qur'an" → tahfidzQuran
- "Tahsin" / "Tahsin Karimah" → tahsin
- "Hadits" → hadits
- "Doa" → doa
- "Asmaul Husna" → asmaulHusna
- "Syair Islami" → syairIslami
- "Tauhid" → tauhid
- "Fiqih" → fiqih
- "Adab" / "Adab dan Akhlaq" → adabAkhlaq
- "Materi Tema" → materiTema
- "Bahasa" → bahasa
- "Kognitif" → kognitif
- "Motorik" → motorik
- "Kreatifitas" / "Kreativitas" → kreatifitas
- "Sakit" → presensi.sakit (angka)
- "Izin" → presensi.izin (angka)
- "Tanpa Keterangan" / "Alfa" / "Alpa" → presensi.tanpaKeterangan (angka)
- "Catatan Musyrifah" / catatan tulis tangan di bawah tabel → catatanMusyrifah

Untuk semester: jika tertulis "1" atau "Ganjil" → "1 Ganjil", jika "2" atau "Genap" → "2 Genap".
Untuk kelas: jika tertulis "K2", "KB", "TK A", "TK B" — tulis apa adanya.
Untuk tahun ajaran: jika tertulis "2025/2026" → "2025/2026" (pakai slash).`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${image}`
                }
              },
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Groq Vision error: ' + err });
    }

    const data = await response.json();
    const raw = data.choices[0].message.content.trim();

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = raw;
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) jsonStr = match[1].trim();

    const parsed = JSON.parse(jsonStr);
    return res.status(200).json({ result: parsed });

  } catch (e) {
    return res.status(500).json({ error: 'Gagal memproses gambar: ' + e.message });
  }
}
