# Viessmann Vitoclima 335-S — VRF Teklif Hazırlayıcı

Eremiz Isıtma Soğutma için geliştirilmiş dahili VRF sistem teklif aracı.

## Özellikler

- **3 Adımlı Sihirbaz** — Talep girişi → Sistem önerisi → Teklif çıktısı
- **Otomatik Dış Ünite Seçimi** — Girilen iç ünite kapasitelerine göre en uygun dış üniteyi seçer
- **Kombinasyon Oranı Kontrolü** — %50–130 aralığı otomatik denetlenir
- **Akıllı Branşman Hesabı** — N-1 joint, büyükten küçüğe kademeli (Q02/A → Q01B/A → Q01/A)
- **Yazdırılabilir Teklif** — Viessmann formatında PDF çıktısı

## Desteklenen İç Ünite Tipleri (13 tip)

| Tip | Seri | Kapasite |
|---|---|---|
| 4 Yön Dairesel Kaset | CV85 | 2,2–16 kW |
| 4 Yön Kompakt Kaset | CV8C | 1,5–5,6 kW |
| 2 Yön Kaset | CV25 | 2,2–5,6 kW |
| 1 Yön Kaset | CV1E | 1,5–7,1 kW |
| Duvar Tipi | WV | 1,5–9,0 kW |
| Orta Statik Kanal | DVM | 1,5–16 kW |
| Yüksek Statik Kanal | DVHD | 1,5–28 kW |
| Slim Kanal (DC Fan) | DVLD | 1,5–7,1 kW |
| Slim Kanal (AC Fan) | DVLA | 1,5–7,1 kW |
| Yer Tavan Tipi | FCV | 2,8–14 kW |
| Konsol Tipi | CSV | 1,5–5,0 kW |
| Kabinsiz Döşeme | CLV | 2,2–7,1 kW |
| Taze Hava Kanallı | FAV | 14–28 kW |

## Kurulum

```bash
npm install
npm run dev
```

## Yayınlama (GitHub Pages)

`main` branch'e push yapınca GitHub Actions otomatik deploy eder.

**Canlı URL:** `https://yigitkeskiner.github.io/viessmann-vrf-teklif/`
