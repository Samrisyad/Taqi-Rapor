// api/generate.js — TaQi Rapor AI Narasi Generator

const NARRATIVE_CONTEXT = {
  "AKHLAK GURU": {
    MB: { a:"Alhamdulillah Ananda mulai menunjukkan sikap yang baik terhadap Musyrifah.", e:"mulai merespon panggilan Musyrifah sesekali mengucapkan salam mulai mengikuti arahan sederhana masih memerlukan pendampingan dalam menjaga adab berbicara", h:"Semoga Ananda semakin terbiasa bersikap santun, merespon arahan dengan baik, serta senantiasa berakhlak mulia kepada Musyrifah dan guru lainnya." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan sikap yang baik terhadap Musyrifah.", e:"memberi salam saat bertemu mengucapkan tolong, maaf, dan terima kasih merespon arahan dengan cukup baik", h:"Semoga Ananda semakin istiqomah menjaga akhlak yang baik kepada Musyrifah maupun guru lainnya." },
    BSB: { a:"Alhamdulillah Ananda menunjukkan akhlak yang sangat baik terhadap Musyrifah.", e:"selalu memberi salam saat bertemu bertutur kata santun merespon arahan dengan sangat baik menunjukkan rasa hormat secara konsisten", h:"Semoga Ananda senantiasa menjaga akhlak mulia tersebut dan menjadi teladan yang baik bagi teman-temannya." },
  },
  "AKHLAK TEMAN": {
    MB: { a:"Alhamdulillah Ananda mulai belajar berinteraksi dengan baik bersama teman-temannya.", e:"mulai bermain bersama teman mulai belajar berbagi mainan masih memerlukan arahan saat terjadi perbedaan pendapat", h:"Semoga Ananda semakin terbiasa berbagi, bekerja sama, dan menunjukkan sikap yang baik kepada teman-temannya." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan hubungan yang baik dengan teman-temannya.", e:"bermain bersama secara positif mampu berbagi alat bermain bekerja sama dalam kegiatan kelompok", h:"Semoga Ananda terus menjaga sikap saling menghargai dan menyayangi sesama teman." },
    BSB: { a:"MasyaAllah Ananda menunjukkan akhlak yang sangat baik kepada teman-temannya.", e:"aktif membantu teman menjaga kerukunan kelompok mampu menjadi penengah saat terjadi perselisihan sederhana", h:"Semoga Allah menjaga akhlak mulia Ananda dan menjadikannya sahabat yang membawa keberkahan bagi banyak orang." },
  },
  "KEMANDIRIAN": {
    MB: { a:"Alhamdulillah Ananda mulai menunjukkan kemandirian dalam kegiatan sehari-hari.", e:"mulai merapikan perlengkapan pribadi mencoba menyelesaikan tugas sendiri masih membutuhkan arahan dalam beberapa aktivitas", h:"Semoga Ananda semakin semangat belajar bertanggung jawab terhadap dirinya sendiri." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan kemandirian yang baik dalam berbagai aktivitas di sekolah.", e:"merapikan perlengkapan sendiri menyelesaikan tugas dengan cukup mandiri menjaga kebutuhan pribadi dengan baik", h:"Semoga Ananda terus menjaga semangat dan tanggung jawab dalam setiap aktivitas yang dilakukan." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemandirian yang sangat baik dalam berbagai kegiatan.", e:"menyelesaikan tugas secara mandiri bertanggung jawab terhadap perlengkapan pribadi mampu mengatur kebutuhan dirinya dengan baik", h:"Semoga Allah menjaga karakter kuat ini dan menjadikannya bekal dalam meraih cita-cita yang mulia." },
  },
  "KEDISIPLINAN": {
    MB: { a:"Alhamdulillah Ananda mulai menunjukkan pemahaman terhadap aturan dan rutinitas sekolah.", e:"mulai mengikuti jadwal kegiatan harian berusaha datang tepat waktu masih memerlukan pengingat dalam beberapa aktivitas", h:"Semoga Ananda semakin terbiasa menjalankan kegiatan dengan tertib dan bertanggung jawab." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan kedisiplinan yang baik dalam kegiatan sekolah.", e:"datang tepat waktu mengikuti kegiatan sesuai jadwal mematuhi aturan kelas dengan baik", h:"Semoga Ananda terus menjaga kebiasaan baik ini dalam kesehariannya." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kedisiplinan yang sangat baik dalam berbagai kegiatan.", e:"konsisten mengikuti aturan datang tepat waktu menjaga ketertiban tanpa perlu diingatkan", h:"Semoga Allah menjaga karakter disiplin ini dan menjadikannya bekal meraih keberhasilan di masa depan." },
  },
  "KARAKTER KEKHALIFAHAN": {
    MB: { a:"Alhamdulillah Ananda mulai menunjukkan keberanian dalam menyampaikan pendapat.", e:"mulai aktif menjawab pertanyaan berani tampil di depan kelompok kecil masih memerlukan dukungan untuk memimpin kegiatan", h:"Semoga Allah menumbuhkan keberanian dan tanggung jawab dalam diri Ananda." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan karakter kepemimpinan yang baik dalam berbagai kegiatan.", e:"berani menyampaikan pendapat mampu mengajak teman bekerja sama menunjukkan rasa tanggung jawab terhadap kelompok", h:"Semoga Allah menjadikan Ananda pemimpin yang membawa manfaat dan kebaikan." },
    BSB: { a:"MasyaAllah Ananda menunjukkan karakter kekhalifahan yang sangat baik.", e:"percaya diri memimpin kelompok mampu mengorganisasi teman bertanggung jawab terhadap tugas bersama", h:"Semoga Allah menjadikan Ananda pemimpin yang amanah, adil, dan dicintai banyak orang." },
  },
  "SOSIAL EMOSIONAL": {
    MB: { a:"Alhamdulillah Ananda mulai mengenali dan mengungkapkan perasaannya dengan baik.", e:"mampu menyampaikan rasa senang atau sedih mulai memahami perasaan teman masih memerlukan bantuan dalam mengelola emosi tertentu", h:"Semoga Allah menumbuhkan ketenangan hati dan kemampuan mengelola emosi dengan baik." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan sosial emosional yang baik.", e:"mampu mengungkapkan perasaan dengan tepat menunjukkan empati kepada teman mampu beradaptasi dalam berbagai kegiatan", h:"Semoga Allah menjaga kelembutan hati dan empati dalam diri Ananda." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kematangan sosial emosional yang sangat baik.", e:"mampu mengelola emosi secara mandiri menunjukkan empati yang tinggi mampu menjaga hubungan yang harmonis dengan teman", h:"Semoga Allah menjaga kelembutan hati dan kebijaksanaan Ananda dalam berinteraksi dengan sesama." },
  },
  "TAHFIDZ": {
    MB: { a:"Alhamdulillah Ananda mulai menunjukkan semangat dalam menghafalkan ayat-ayat Al-Qur'an. memorization_or_mastery: sedang dalam proses menghafal surat pilihan sesuai target semester.", e:"mampu mengikuti muroja'ah bersama mulai menghafal beberapa ayat dengan bantuan masih memerlukan pengulangan yang konsisten", h:"Semoga Allah memudahkan Ananda dalam menghafal ayat-ayat-Nya dan menumbuhkan kecintaan terhadap Al-Qur'an sejak dini." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam hafalan Al-Qur'an. memorization_or_mastery: mampu menghafal surat target semester dengan cukup lancar.", e:"muroja'ah dengan baik mampu melanjutkan ayat yang dibacakan menunjukkan ketekunan dalam menghafal", h:"Semoga Allah menjaga hafalan Ananda dan menambah keberkahan ilmu yang dipelajarinya." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan hafalan Al-Qur'an yang sangat baik. memorization_or_mastery: hafalan surat target semester sangat lancar dan kuat.", e:"mampu muroja'ah mandiri hafalan stabil mampu mengikuti tasmi' dengan baik", h:"Semoga Allah menjadikan Ananda ahlul Qur'an yang mengamalkan dan menjaga kalam-Nya sepanjang hayat." },
  },
  "TAHSIN": {
    MB: { a:"Alhamdulillah Ananda mulai menunjukkan perkembangan dalam membaca Al-Qur'an. memorization_or_mastery: mulai mengenal dan mempraktikkan kaidah bacaan sederhana.", e:"mengikuti talaqqi dengan baik mulai memperhatikan makhraj membutuhkan bimbingan dalam kelancaran bacaan", h:"Semoga Allah memudahkan Ananda dalam membaca Al-Qur'an dengan baik dan benar." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam tahsin Al-Qur'an. memorization_or_mastery: mampu membaca sesuai materi tahsin semester.", e:"memperhatikan panjang pendek bacaan mengikuti koreksi dengan baik menunjukkan kemajuan dalam makhraj", h:"Semoga Allah menjaga semangat Ananda dalam mempelajari dan membaca Al-Qur'an." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan membaca Al-Qur'an yang sangat baik. memorization_or_mastery: mampu membaca materi tahsin dengan lancar dan sesuai kaidah yang dipelajari.", e:"makhraj baik memperhatikan hukum bacaan mampu memperbaiki kesalahan secara mandiri", h:"Semoga Allah menjadikan bacaan Al-Qur'an Ananda semakin indah dan penuh keberkahan. TAQI_NARRATIVE_BLOCKS_V2" },
  },
  "HADITS": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal hadits-hadits pilihan yang dipelajari. memorization_or_mastery: mampu mengikuti pembacaan hadits dan menghafal sebagian lafadz yang diajarkan.", e:"mengikuti muroja'ah hadits bersama mulai mengingat lafadz hadits masih memerlukan pengulangan yang konsisten", h:"Semoga Allah memudahkan Ananda dalam menghafal dan mengamalkan hadits-hadits Rasulullah ﷺ dalam kehidupan sehari-hari." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam hafalan hadits. memorization_or_mastery: mampu menghafal hadits target semester dengan cukup baik.", e:"menghafal lafadz hadits dengan cukup lancar mengikuti muroja'ah dengan baik mulai memahami makna sederhana dari hadits", h:"Semoga Allah menjadikan hadits Rasulullah ﷺ sebagai pedoman dalam kehidupan Ananda." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan yang sangat baik dalam hafalan hadits. memorization_or_mastery: mampu menghafal dan menyampaikan hadits dengan lancar.", e:"hafalan kuat dan stabil mampu mengikuti tasmi' hadits dengan baik menunjukkan usaha mengamalkan pesan hadits", h:"Semoga Allah menjadikan Ananda generasi yang mencintai sunnah Rasulullah ﷺ." },
  },
  "DOA": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal doa-doa harian yang dipelajari. memorization_or_mastery: mampu mengikuti pembacaan doa dan menghafal sebagian lafadz.", e:"mengikuti muroja'ah doa bersama mulai mengingat lafadz doa sederhana masih memerlukan bimbingan dalam pelafalan", h:"Semoga Allah menumbuhkan kecintaan Ananda untuk selalu mengingat-Nya melalui doa." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam hafalan doa harian. memorization_or_mastery: mampu menghafal doa target semester dengan cukup lancar.", e:"membaca doa pada waktu yang sesuai mengikuti muroja'ah dengan baik memahami makna sederhana beberapa doa", h:"Semoga Allah menjaga kebiasaan baik ini dan menjadikan doa sebagai kebutuhan dalam hidup Ananda." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan yang sangat baik dalam hafalan doa harian. memorization_or_mastery: mampu menghafal dan membaca doa dengan lancar serta tepat penggunaannya.", e:"hafalan doa kuat terbiasa membaca doa tanpa diingatkan memahami fungsi beberapa doa yang dipelajari", h:"Semoga Allah senantiasa menjaga hati Ananda agar dekat dengan-Nya melalui doa-doa yang dipanjatkan." },
  },
  "DALIL": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal dalil-dalil pilihan yang dipelajari. memorization_or_mastery: mampu mengikuti pembacaan dalil dengan bimbingan.", e:"mulai menghafal potongan ayat atau dalil mengikuti muroja'ah bersama masih memerlukan pengulangan yang konsisten", h:"Semoga Allah memudahkan Ananda dalam mengenal dan mencintai dalil-dalil agama-Nya." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam menghafal dalil. memorization_or_mastery: mampu menghafal dalil target semester dengan cukup baik.", e:"hafalan berkembang sesuai target mampu mengikuti muroja'ah mulai mengaitkan dalil dengan materi yang dipelajari", h:"Semoga Allah menjadikan ilmu yang dipelajari Ananda bermanfaat dan penuh keberkahan." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan yang sangat baik dalam hafalan dalil. memorization_or_mastery: mampu menghafal dan menyampaikan dalil dengan lancar.", e:"hafalan kuat mampu menjelaskan keterkaitan sederhana dengan materi pembelajaran aktif saat muroja'ah", h:"Semoga Allah menjadikan Ananda pribadi yang mencintai ilmu dan menjadikan dalil sebagai pedoman hidup." },
  },
  "IBADAH SHOLAT": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal gerakan dan bacaan sholat. memorization_or_mastery: mampu mengikuti sebagian rangkaian sholat dengan bimbingan.", e:"mengikuti praktik sholat berjamaah mulai mengenali urutan gerakan masih memerlukan arahan dalam bacaan", h:"Semoga Allah menumbuhkan kecintaan Ananda terhadap sholat sejak usia dini." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam praktik sholat. memorization_or_mastery: mampu mengikuti rangkaian sholat dengan cukup baik.", e:"mengikuti gerakan dengan benar menghafal sebagian bacaan sholat menjaga adab saat sholat berjamaah", h:"Semoga Allah menjadikan sholat sebagai kebutuhan dan cahaya dalam kehidupan Ananda." },
    BSB: { a:"MasyaAllah Ananda menunjukkan perkembangan yang sangat baik dalam ibadah sholat. memorization_or_mastery: mampu melaksanakan gerakan dan bacaan sholat dengan baik sesuai materi yang dipelajari.", e:"mengikuti sholat berjamaah dengan tertib memahami urutan gerakan menunjukkan kesungguhan saat beribadah", h:"Semoga Allah menjaga semangat ibadah Ananda dan menjadikannya hamba yang mencintai sholat. TAQI_NARRATIVE_BLOCKS_V2" },
  },
  "BAHASA ARAB": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal kosakata Bahasa Arab yang dipelajari. memorization_or_mastery: mampu mengingat beberapa mufrodat sederhana sesuai tema pembelajaran.", e:"mengikuti pengulangan mufrodat bersama mengenali beberapa kosakata yang sering digunakan masih memerlukan bantuan dalam pengucapan", h:"Semoga Allah memudahkan Ananda dalam mengenal dan mencintai Bahasa Arab sebagai bahasa yang mulia." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam pembelajaran Bahasa Arab. memorization_or_mastery: mampu memahami dan menyebutkan mufrodat sesuai target semester.", e:"mengenali kosakata yang dipelajari mampu menjawab pertanyaan sederhana menunjukkan antusiasme saat kegiatan Bahasa Arab", h:"Semoga Allah menumbuhkan semangat belajar Bahasa Arab dalam diri Ananda." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan yang sangat baik dalam pembelajaran Bahasa Arab. memorization_or_mastery: mampu mengingat dan menggunakan mufrodat yang dipelajari dengan baik.", e:"hafalan mufrodat kuat aktif saat pembelajaran mampu menghubungkan kosakata dengan konteks yang tepat", h:"Semoga Allah menjadikan Bahasa Arab sebagai pintu ilmu dan keberkahan bagi Ananda." },
  },
  "BAHASA INGGRIS": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal kosakata Bahasa Inggris yang dipelajari. memorization_or_mastery: mampu mengenali dan menyebutkan beberapa vocabulary sederhana.", e:"mengikuti lagu dan permainan berbahasa Inggris mengenal beberapa kata sesuai tema masih memerlukan pengulangan dalam pelafalan", h:"Semoga Ananda semakin semangat belajar dan berani menggunakan Bahasa Inggris dalam kesehariannya." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam Bahasa Inggris. memorization_or_mastery: mampu memahami dan menggunakan vocabulary yang dipelajari.", e:"menjawab pertanyaan sederhana mengenali kosakata tema pembelajaran mengikuti aktivitas bahasa dengan baik", h:"Semoga Allah memudahkan Ananda dalam mengembangkan kemampuan bahasa yang bermanfaat." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan yang sangat baik dalam Bahasa Inggris. memorization_or_mastery: mampu menggunakan kosakata dan ungkapan sederhana dengan percaya diri.", e:"aktif dalam kegiatan bahasa cepat memahami vocabulary baru menunjukkan keberanian dalam berkomunikasi", h:"Semoga Allah menjaga semangat belajar dan rasa ingin tahu Ananda terhadap berbagai ilmu yang bermanfaat." },
  },
  "TADABBUR": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal makna sederhana dari ayat dan materi yang dipelajari. memorization_or_mastery: mampu memahami pesan dasar yang disampaikan melalui kegiatan tadabbur.", e:"mendengarkan kisah dan penjelasan dengan baik menjawab pertanyaan sederhana mulai menghubungkan pelajaran dengan kehidupan sehari-hari", h:"Semoga Allah menumbuhkan hati yang senantiasa bersyukur dan gemar mengambil pelajaran dari setiap peristiwa." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan pemahaman yang baik dalam kegiatan tadabbur. memorization_or_mastery: mampu menangkap pesan utama dari materi yang dipelajari.", e:"aktif dalam diskusi sederhana mampu menceritakan kembali pelajaran yang diperoleh menghubungkan nilai Islam dengan pengalaman sehari-hari", h:"Semoga Allah menjadikan Ananda pribadi yang senantiasa berpikir, bersyukur, dan mengambil hikmah." },
    BSB: { a:"MasyaAllah Ananda menunjukkan pemahaman yang sangat baik dalam kegiatan tadabbur. memorization_or_mastery: mampu memahami dan menyampaikan kembali hikmah dari materi yang dipelajari.", e:"aktif menyampaikan pendapat menunjukkan refleksi yang baik mampu menghubungkan pelajaran dengan kehidupan nyata", h:"Semoga Allah menjadikan Ananda pribadi yang bijaksana dan dekat dengan petunjuk-Nya." },
  },
  "TERJEMAH QUR'AN": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal makna sederhana dari ayat-ayat yang dipelajari. memorization_or_mastery: mampu memahami beberapa kosakata dan makna dasar.", e:"mengikuti pembelajaran dengan baik mengenali arti sederhana masih memerlukan penguatan dalam mengingat makna", h:"Semoga Allah memudahkan Ananda dalam memahami dan mencintai Al-Qur'an." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam memahami terjemah Al-Qur'an. memorization_or_mastery: mampu memahami makna ayat sesuai target pembelajaran.", e:"mengingat arti ayat yang dipelajari mampu menjawab pertanyaan sederhana menunjukkan minat terhadap makna Al-Qur'an", h:"Semoga Allah menjadikan Al-Qur'an sebagai petunjuk yang senantiasa dekat dengan hati Ananda." },
    BSB: { a:"MasyaAllah Ananda menunjukkan pemahaman yang sangat baik terhadap terjemah ayat yang dipelajari. memorization_or_mastery: mampu memahami dan menjelaskan kembali makna sederhana ayat.", e:"mengingat arti dengan baik mampu menghubungkan makna dengan kehidupan sehari-hari aktif saat pembelajaran", h:"Semoga Allah menjadikan Ananda generasi Qur'ani yang memahami dan mengamalkan petunjuk-Nya." },
  },
  "ASMAUL HUSNA": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal nama-nama Allah yang dipelajari. memorization_or_mastery: mampu menghafal sebagian Asmaul Husna sesuai target pembelajaran.", e:"mengikuti muroja'ah bersama mengenali beberapa nama Allah masih memerlukan pengulangan yang konsisten", h:"Semoga Allah menumbuhkan kecintaan Ananda untuk semakin mengenal Rabb-nya." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam hafalan Asmaul Husna. memorization_or_mastery: mampu menghafal dan mengenali makna sederhana beberapa Asmaul Husna.", e:"hafalan berkembang sesuai target mengikuti muroja'ah dengan baik memahami makna dasar beberapa nama Allah", h:"Semoga Allah menjadikan Ananda pribadi yang semakin mengenal dan mencintai-Nya." },
    BSB: { a:"MasyaAllah Ananda menunjukkan perkembangan yang sangat baik dalam Asmaul Husna. memorization_or_mastery: mampu menghafal dan memahami beberapa Asmaul Husna yang dipelajari.", e:"hafalan lancar mengenali makna dengan baik menunjukkan antusiasme saat pembelajaran", h:"Semoga Allah menjaga hati Ananda agar senantiasa dekat dengan-Nya dan bertumbuh dalam keimanan. TAQI_NARRATIVE_BLOCKS_V3" },
  },
  "TAUHID": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal Allah sebagai Rabb yang menciptakan dirinya dan seluruh alam semesta. memorization_or_mastery: mampu mengenali konsep tauhid sederhana sesuai usia.", e:"mengenal bahwa Allah adalah Pencipta mampu menjawab pertanyaan sederhana tentang ciptaan Allah menunjukkan rasa kagum terhadap alam sekitar", h:"Semoga Allah menumbuhkan kecintaan dan keyakinan yang kuat dalam hati Ananda sejak usia dini." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan pemahaman yang baik tentang konsep tauhid yang dipelajari. memorization_or_mastery: mampu memahami keterkaitan antara ciptaan dan kebesaran Allah.", e:"menyebutkan nikmat Allah dalam kehidupan menunjukkan rasa syukur mampu menghubungkan pelajaran dengan kebesaran Allah", h:"Semoga Allah menjaga fitrah keimanan Ananda dan menumbuhkannya menjadi pribadi yang bertauhid kuat." },
    BSB: { a:"MasyaAllah Ananda menunjukkan pemahaman yang sangat baik terhadap nilai-nilai tauhid yang dipelajari. memorization_or_mastery: mampu memahami dan menyampaikan kembali konsep tauhid sesuai tahap perkembangannya.", e:"menunjukkan rasa syukur yang konsisten mengaitkan berbagai nikmat kepada Allah aktif dalam diskusi tentang kebesaran Allah", h:"Semoga Allah menjaga hati Ananda agar senantiasa mengenal, mencintai, dan bergantung hanya kepada-Nya." },
  },
  "KISAH NABI": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal kisah para nabi yang dipelajari. memorization_or_mastery: mampu mengingat tokoh dan peristiwa sederhana dalam kisah nabi.", e:"mendengarkan kisah dengan antusias mengenali nama nabi yang dipelajari mampu menceritakan kembali sebagian kisah", h:"Semoga Allah menumbuhkan kecintaan Ananda kepada para nabi dan rasul-Nya." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan pemahaman yang baik terhadap kisah nabi yang dipelajari. memorization_or_mastery: mampu mengingat alur cerita dan pesan utama dari kisah tersebut.", e:"menjawab pertanyaan dengan baik menceritakan kembali kisah secara sederhana mengenali nilai-nilai positif yang terkandung di dalamnya", h:"Semoga Allah menjadikan kisah para nabi sebagai inspirasi dalam kehidupan Ananda." },
    BSB: { a:"MasyaAllah Ananda menunjukkan pemahaman yang sangat baik terhadap kisah nabi yang dipelajari. memorization_or_mastery: mampu memahami dan menyampaikan hikmah utama dari kisah tersebut.", e:"aktif berdiskusi mampu menghubungkan kisah dengan kehidupan sehari-hari menunjukkan ketertarikan yang tinggi", h:"Semoga Allah menumbuhkan semangat untuk meneladani akhlak para nabi dalam kesehariannya." },
  },
  "KISAH TELADAN": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal tokoh-tokoh teladan yang dipelajari. memorization_or_mastery: mampu mengingat pesan sederhana dari kisah yang disampaikan.", e:"mendengarkan cerita dengan baik mengenali perilaku yang baik dalam kisah mampu menyebutkan pelajaran sederhana", h:"Semoga Allah memudahkan Ananda mengambil pelajaran dari setiap kisah yang dipelajari." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan pemahaman yang baik terhadap kisah teladan. memorization_or_mastery: mampu mengenali nilai karakter yang diajarkan.", e:"menceritakan kembali kisah memahami pesan moral menunjukkan ketertarikan terhadap tokoh teladan", h:"Semoga Allah menjadikan kisah-kisah teladan sebagai inspirasi dalam bertumbuh menjadi pribadi yang baik." },
    BSB: { a:"MasyaAllah Ananda menunjukkan kemampuan yang sangat baik dalam memahami kisah teladan. memorization_or_mastery: mampu menangkap hikmah dan nilai karakter yang terkandung dalam kisah.", e:"mampu menghubungkan kisah dengan kehidupan sehari-hari menunjukkan refleksi yang baik aktif menyampaikan pendapat", h:"Semoga Allah menjadikan setiap kisah yang dipelajari sebagai jalan pembentukan akhlak yang mulia." },
  },
  "MATERI FIKIH": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal konsep fikih sederhana sesuai materi pembelajaran. memorization_or_mastery: memahami dasar-dasar adab dan ibadah yang dipelajari.", e:"mengikuti praktik sederhana mengenali aturan dasar masih memerlukan bimbingan dalam penerapan", h:"Semoga Allah memudahkan Ananda memahami dan mengamalkan ilmu yang dipelajari." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan perkembangan yang baik dalam materi fikih. memorization_or_mastery: mampu memahami dan mempraktikkan materi yang dipelajari.", e:"mengikuti praktik dengan baik memahami langkah-langkah sederhana menunjukkan kesungguhan saat pembelajaran", h:"Semoga Allah menjaga semangat belajar dan mengamalkan ilmu yang telah dipelajari." },
    BSB: { a:"MasyaAllah Ananda menunjukkan pemahaman yang sangat baik dalam materi fikih. memorization_or_mastery: mampu memahami dan mempraktikkan materi dengan baik sesuai tahap perkembangan.", e:"mengikuti praktik secara mandiri memahami tujuan dari materi yang dipelajari menunjukkan konsistensi dalam penerapan", h:"Semoga Allah menjadikan ilmu yang dipelajari sebagai amal yang bermanfaat sepanjang hayat." },
  },
  "MATERI TEMA": {
    MB: { a:"Alhamdulillah Ananda mulai mengenal tema pembelajaran yang dipelajari selama semester ini. memorization_or_mastery: memahami konsep-konsep dasar sesuai tema.", e:"mengikuti kegiatan eksplorasi mengenali objek yang dipelajari menunjukkan rasa ingin tahu", h:"Semoga Allah menjaga semangat belajar dan rasa ingin tahu Ananda terhadap berbagai hal yang bermanfaat." },
    BCB: { a:"Alhamdulillah Ananda menunjukkan pemahaman yang baik terhadap tema pembelajaran. memorization_or_mastery: mampu menghubungkan berbagai konsep yang dipelajari.", e:"aktif dalam kegiatan tema mampu menjawab pertanyaan sederhana menunjukkan antusiasme belajar", h:"Semoga Allah menjadikan setiap ilmu yang dipelajari sebagai jalan menuju kebaikan." },
    BSB: { a:"MasyaAllah Ananda menunjukkan pemahaman yang sangat baik terhadap tema pembelajaran. memorization_or_mastery: mampu memahami dan menjelaskan kembali konsep-konsep yang dipelajari.", e:"aktif mengeksplorasi materi menunjukkan rasa ingin tahu yang tinggi mampu mengaitkan pembelajaran dengan pengalaman sehari-hari", h:"Semoga Allah menjaga semangat belajar Ananda dan menjadikannya pribadi yang berilmu serta bermanfaat. TAQI_NARRATIVE_BLOCKS_V3" },
  },
};

const POIN_DOMAIN_MAP = {
  'Akhlak Kepada Guru': 'AKHLAK GURU',
  'Akhlak Kepada Teman': 'AKHLAK TEMAN',
  'Kemandirian': 'KEMANDIRIAN',
  'Kedisiplinan': 'KEDISIPLINAN',
  'Karakter Kekhalifahan': 'KARAKTER KEKHALIFAHAN',
  'Sosial Emosional': 'SOSIAL EMOSIONAL',
  'Tahfidz Qur\'an': 'TAHFIDZ',
  'Tahsin Karimah & Al-Qur\'an': 'TAHSIN',
  'Hadits': 'HADITS',
  'Doa': 'DOA',
  'Asmaul Husna': 'ASMAUL HUSNA',
  'Dalil': 'DALIL',
  'Ibadah Sholat': 'IBADAH SHOLAT',
  'Bahasa Arab Dan Inggris': 'BAHASA ARAB',
  'Tadabbur Al-Qur\'an': 'TADABBUR',
  'Terjemah Al-Qur\'an': "TERJEMAH QUR'AN",
  'Tauhid : Mengenal Allah': 'TAUHID',
  'Tauhid : Rukun Islam': 'TAUHID',
  'Materi Fiqih': 'MATERI FIKIH',
  'Fiqih': 'MATERI FIKIH',
  'Adab dan Akhlaq': 'AKHLAK GURU',
  'Materi Tema': 'MATERI TEMA',
  'Kisah Nabi dan Para Sahabat': 'KISAH NABI',
  'Kisah Ilmuwan Muslim dan Sifat Rasulullah ÷': 'KISAH TELADAN',
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { poin, level, evidence, namaSantri, kelas } = req.body;

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

  // Look up domain-specific narrative patterns
  const domainKey = POIN_DOMAIN_MAP[poin];
  const domainCtx = domainKey && NARRATIVE_CONTEXT[domainKey];
  const pattern = domainCtx && domainCtx[level];

  const patternBlock = pattern
    ? `\nREFERENSI POLA NARASI untuk domain "${domainKey}" level ${level}:
- Achievement: ${pattern.a}
- Evidence tipikal: ${pattern.e}
- Hope/Doa: ${pattern.h}
Gunakan pola di atas sebagai INSPIRASI gaya dan tone, namun WAJIB sesuaikan dengan evidence nyata dari Musyrifah di bawah.`
    : '';

  const prompt = `Kamu adalah Musyrifah senior di KB-TK Tarbiyah Qur'aniyah (TaQi), sekolah Islam berbasis karakter Qur'ani. Tugasmu menulis narasi rapor perkembangan santri yang hangat, personal, dan Islami.

TAQI NARRATIVE DNA — pola wajib:
PENCAPAIAN → BUKTI NYATA → INSIGHT PERKEMBANGAN → HARAPAN & DOA

ATURAN PENULISAN:
1. Mulai dengan "Alhamdulillah" (MB/BCB) atau "MasyaAllah" (BSB)
2. Panjang: 60–120 kata — tidak lebih, tidak kurang
3. DILARANG kata: kurang, lemah, gagal, buruk, tidak bisa, belum mampu, masih kesulitan
4. Hal yang perlu ditingkatkan: ungkapkan HANYA sebagai harapan/doa di akhir
5. Tutup dengan "Semoga…" atau kalimat doa
6. Bahasa: hangat, apresiatif, observatif — seperti Musyrifah yang menyayangi santrinya
7. Sebut santri dengan "Ananda [nama pertama]"
8. Boleh sebut nama Allah, Rasulullah, atau referensi Islami yang relevan
9. Jangan terdengar seperti mesin — harus terdengar seperti Musyrifah TaQi${patternBlock}

DATA SANTRI:
- Nama: ${namaSantri}
- Kelas: ${kelas}
- Poin Penilaian: ${poin}
- Tingkat Perkembangan: ${levelFull} (${level})
- Evidence dari Musyrifah: ${evidence || '(tidak ada catatan khusus, tulis narasi umum sesuai level)'}

Tulis HANYA narasi rapor (tanpa judul, tanpa penjelasan tambahan):`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 350,
            topP: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: 'Gemini API error: ' + errText });
    }

    const data = await response.json();
    const narasi = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!narasi) {
      return res.status(500).json({ error: 'Tidak ada respons dari AI, coba lagi.' });
    }

    return res.status(200).json({ narasi });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
