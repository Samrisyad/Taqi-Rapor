export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const apiKey = process.env.GEMINI_API_KEY_2;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `Kamu adalah sistem OCR untuk catatan penilaian santri KB-TK Tarbiyah Qur'aniyah yang ditulis tangan oleh musyrifah.

Catatan ini TIDAK selalu berbentuk tabel rapi. Bisa berupa tulisan bebas, grid tidak beraturan, atau catatan acak di kertas. Yang penting: temukan nama poin dan nilainya.

ATURAN PENTING:
- Nilai penilaian HANYA 3 kemungkinan: "MB", "BCB", atau "BSB" (bisa ditulis huruf kecil/kapital)
- Evidence adalah teks kecil/catatan yang ditulis di bawah atau di samping nilai poin (dalam kurung, atau teks kecil setelah nilai)
- Jika poin tidak ditemukan atau tidak terbaca → level: null, evidence: ""
- Kembalikan HANYA JSON, tanpa teks lain, tanpa markdown

DAFTAR POIN VALID dan ALIAS-nya (gunakan fuzzy match — cocokkan meskipun penulisan berbeda):
- "Akhlak Guru" / "Akhlak Kepada Guru" → akhlakGuru
- "Akhlak Teman" / "Akhlak Kepada Teman" → akhlakTeman
- "Kemandirian" / "Mandiri" → kemandirian
- "Kedisiplinan" / "Disiplin" → kedisiplinan
- "Kekhalifahan" / "Karakter Kekhalifahan" / "Khalifah" / "Kepemimpinan" → karakterKekhalifahan
- "Sosial Emosional" / "Sosem" / "Sosial" → sosialEmosional
- "Tahfidz" / "Tahfidz Qur'an" / "Hafalan Quran" → tahfidzQuran
- "Tahsin" / "Tahsin Karimah" / "Baca Quran" → tahsin
- "Hadits" / "Hafalan Hadits" → hadits
- "Doa" / "Hafalan Doa" / "Doa Harian" → doa
- "Asmaul Husna" / "Asma" / "Asmaul" → asmaulHusna
- "Syair" / "Syair Islami" / "Nasyid" → syairIslami
- "Dalil" / "Hafalan Dalil" → dalil
- "Ibadah Sholat" / "Sholat" / "Praktek Sholat" → ibadahSholat
- "Bahasa Arab" / "Bahasa Arab Inggris" / "Mufrodat" → bahasaArab
- "Tadabbur" / "Tadabbur Quran" → tadabbur
- "Terjemah" / "Terjemah Quran" → terjemahQuran
- "Tauhid" / "Mengenal Allah" / "Aqidah" → tauhid
- "Fiqih" / "Materi Fiqih" / "Fikih" → fiqih
- "Adab" / "Adab Akhlaq" / "Adab dan Akhlaq" → adabAkhlaq
- "Materi Tema" / "Tema" / "Pengetahuan Umum" → materiTema
- "Kisah Nabi" / "Kisah Para Nabi" / "Sirah" → kisahNabi
- "Kisah Ilmuwan" / "Kisah Teladan" / "Ilmuwan Muslim" → kisahIlmuwan
- "Bahasa" / "Kemampuan Bahasa" / "Bahasa Indonesia" → kemampuanBahasa
- "Kognitif" / "Berpikir" / "Akademik" → kognitif
- "Motorik" / "Fisik" / "Gerak" → motorik
- "Kreatifitas" / "Kreativitas" / "Seni" / "Kreasi" → kreatifitas

FORMAT JSON yang harus dikembalikan:
{
  "santri": {
    "nama": "",
    "nis": "",
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
    "akhlakGuru":           { "level": null, "evidence": "" },
    "akhlakTeman":          { "level": null, "evidence": "" },
    "kemandirian":          { "level": null, "evidence": "" },
    "kedisiplinan":         { "level": null, "evidence": "" },
    "karakterKekhalifahan": { "level": null, "evidence": "" },
    "sosialEmosional":      { "level": null, "evidence": "" },
    "tahfidzQuran":         { "level": null, "evidence": "" },
    "tahsin":               { "level": null, "evidence": "" },
    "hadits":               { "level": null, "evidence": "" },
    "doa":                  { "level": null, "evidence": "" },
    "asmaulHusna":          { "level": null, "evidence": "" },
    "syairIslami":          { "level": null, "evidence": "" },
    "dalil":                { "level": null, "evidence": "" },
    "ibadahSholat":         { "level": null, "evidence": "" },
    "bahasaArab":           { "level": null, "evidence": "" },
    "tadabbur":             { "level": null, "evidence": "" },
    "terjemahQuran":        { "level": null, "evidence": "" },
    "tauhid":               { "level": null, "evidence": "" },
    "fiqih":                { "level": null, "evidence": "" },
    "adabAkhlaq":           { "level": null, "evidence": "" },
    "materiTema":           { "level": null, "evidence": "" },
    "kisahNabi":            { "level": null, "evidence": "" },
    "kisahIlmuwan":         { "level": null, "evidence": "" },
    "kemampuanBahasa":      { "level": null, "evidence": "" },
    "kognitif":             { "level": null, "evidence": "" },
    "motorik":              { "level": null, "evidence": "" },
    "kreatifitas":          { "level": null, "evidence": "" }
  }
}

CATATAN:
- semester: "1" atau "Ganjil" → "1 (Ganjil)", "2" atau "Genap" → "2 (Genap)"
- kelas: tulis apa adanya (K1, K2, PRE K, TODDLER, dll)
- tahun ajaran: format "2025/2026" (pakai slash)
- evidence: teks kecil/catatan di bawah atau di samping nilai poin (max 150 karakter). Jika tidak ada → ""
- catatanMusyrifah: catatan umum di luar penilaian per poin, jika ada`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: image
                }
              },
              { text: prompt }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2000
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Gemini Vision error: ' + err });
    }

    const data = await response.json();
    const raw = data.candidates[0].content.parts[0].text.trim();

    // Extract JSON (handle markdown code blocks)
    let jsonStr = raw;
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) jsonStr = match[1].trim();

    const parsed = JSON.parse(jsonStr);

    // Normalize level values
    if (parsed.penilaian) {
      for (const key of Object.keys(parsed.penilaian)) {
        const p = parsed.penilaian[key];
        if (p && p.level) {
          p.level = p.level.toUpperCase().trim();
          if (!['MB', 'BCB', 'BSB'].includes(p.level)) p.level = null;
        }
        if (p && !p.evidence) p.evidence = '';
      }
    }

    return res.status(200).json({ result: parsed });

  } catch (e) {
    return res.status(500).json({ error: 'Gagal memproses gambar: ' + e.message });
  }
}
