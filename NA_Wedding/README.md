# NA Wedding — Nazar & Aam

Template undangan digital pribadi yang mengikuti referensi visual yang diberikan: floral botanical frame, ivory textured paper, champagne-gold linework, sage/olive buttons, ornate arch, dan 12 layar section.

## Struktur
- `index.html` — 12 section undangan.
- `style.css` — desain responsif, ornamen, layout, animasi ringan.
- `script.js` — swipe/tap navigation, countdown, RSVP, wishes, copy rekening, musik.
- `config.js` — pengaturan URL Apps Script, tanggal, venue, maps, rekening.
- `apps-script/Code.gs` — backend Google Apps Script.
- `assets/images/` — foto pribadi dan ornamen floral.
- `assets/music/wedding.mp3` — musik pilihan sendiri.

## Ganti foto
Ganti file dengan nama sama:
- `cover.jpg` — foto cover pasangan.
- `groom.jpg` — potret Nazar.
- `bride.jpg` — potret Aam.
- `gallery-1.jpg` sampai `gallery-4.jpg`.
- `closing.jpg` — foto penutup.
- `map-preview.jpg` — preview peta opsional.
- `floral-corner.svg` — ornamen floral vektor bawaan untuk sudut section. Bisa diganti dengan aset floral SVG/PNG pilihan sendiri.

Foto tidak disertakan karena harus menggunakan foto pasangan sendiri. Foto akan otomatis mengikuti frame dan crop yang sudah diatur CSS.

## Ganti musik
Ganti `assets/music/wedding.mp3` dengan file MP3 pilihan, nama file tetap `wedding.mp3`. Musik diputar setelah pengunjung menekan tombol Buka Undangan atau tombol musik karena aturan autoplay browser.

## Ubah data
Edit `config.js` untuk tanggal countdown, lokasi, Google Maps, rekening, dan URL Apps Script. Edit `index.html` untuk nama orang tua, jam acara, dan cerita hubungan.

## Setup Apps Script + Spreadsheet
1. Buka script.google.com dan buat project.
2. Salin seluruh `apps-script/Code.gs`.
3. Jalankan `setupNAWedding()` satu kali dan berikan izin.
4. Lihat Execution log untuk URL Spreadsheet.
5. Deploy > New deployment > Web app.
6. Execute as: Me; Who has access: Anyone.
7. Salin URL Web App berakhiran `/exec` ke `API_URL` di `config.js`.

## GitHub Pages
1. Buat repository GitHub.
2. Upload isi folder ini ke root repository.
3. Settings > Pages > Deploy from a branch > `main` > `/ (root)` > Save.
4. Uji undangan melalui URL publik.
5. Kirim RSVP dan ucapan uji coba, pastikan masuk ke tab `RSVP` dan `Ucapan`.

## Catatan aset floral
Agar hasil visual makin dekat dengan referensi, gunakan aset vektor `floral-corner.svg` bawaan atau ganti dengan file floral PNG transparan berisi rangkaian bunga putih kecil dan dedaunan olive. File tersebut dapat diganti kapan saja tanpa mengubah HTML. Jangan gunakan gambar referensi utuh sebagai background satu layar; setiap teks, tombol, formulir, dan navigasi tetap elemen web yang aktif.
