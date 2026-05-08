import { useState, useMemo } from "react";

// ─── RENK & STİL ─────────────────────────────────────────────────────────────
const C = { red:"#e54c00", dark:"#0f172a", mid:"#334155", light:"#64748b", bg:"#f1f5f9", white:"#fff", blue:"#1e40af", green:"#16a34a", warn:"#d97706", err:"#dc2626" };

// ─── İÇ ÜNİTE TİPLERİ VE MODEL EŞLEŞMELERİ ─────────────────────────────────
// Her tip için: btu → { kod, urunkod, kw, kapasite }
const IC_TIPLER = {
  "4 Yön Dairesel Kaset": {
    ikon: "⊞",
    btuler: [
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"CV85022M1", urunkod:"ZK07320" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"CV85028M1", urunkod:"ZK07321" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"CV85036M1", urunkod:"ZK07322" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"CV85045M1", urunkod:"ZK07323" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"CV85056M1", urunkod:"ZK07324" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"CV85071M1", urunkod:"ZK07325" },
      { btu:30700, kw:9.0,  kapasite:"9,0 kW",  kod:"CV85090M1", urunkod:"ZK07326" },
      { btu:38200, kw:11.2, kapasite:"11,2 kW", kod:"CV85112M1", urunkod:"ZK07327" },
      { btu:47700, kw:14.0, kapasite:"14,0 kW", kod:"CV85140M1", urunkod:"ZK07328" },
      { btu:54600, kw:16.0, kapasite:"16,0 kW", kod:"CV85160M1", urunkod:"ZK07329" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: (kap) => `Dört Yöne Üflemeli Dairesel Atışlı Kaset Tipi İç Ünite`,
  },
  "4 Yön Kompakt Kaset": {
    ikon: "▣",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"CV8C5015M1", urunkod:"ZK07330" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"CV8C5022M1", urunkod:"ZK07331" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"CV8C5028M1", urunkod:"ZK07332" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"CV8C5036M1", urunkod:"ZK07333" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"CV8C5045M1", urunkod:"ZK07334" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"CV8C5056M1", urunkod:"ZK07335" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Dört Yöne Üflemeli Kompakt Kaset Tipi İç Ünite`,
  },
  "2 Yön Kaset": {
    ikon: "◫",
    btuler: [
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"CV25021M1", urunkod:"ZK07310" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"CV25028M1", urunkod:"ZK07311" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"CV25036M1", urunkod:"ZK07312" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"CV25045M1", urunkod:"ZK07313" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"CV25056M1", urunkod:"ZK07314" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `İki Yöne Üflemeli Kaset Tipi İç Ünite`,
  },
  "1 Yön Kaset": {
    ikon: "▭",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"CV1E5015M1", urunkod:"ZK07301" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"CV1E5022M1", urunkod:"ZK07302" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"CV1E5028M1", urunkod:"ZK07303" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"CV1E5036M2", urunkod:"ZK07304" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"CV1E5056M2", urunkod:"ZK07306" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"CV1E5071M2", urunkod:"ZK07307" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Tek Yöne Üflemeli Kaset Tipi İç Ünite`,
  },
  "Duvar Tipi": {
    ikon: "▬",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"WV5015M1", urunkod:"7955660" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"WV5022M1", urunkod:"7955661" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"WV5028M1", urunkod:"7955670" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"WV5036M1", urunkod:"7955671" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"WV5045M1", urunkod:"7955672" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"WV5056M1", urunkod:"7955673" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"WV5071M1", urunkod:"7955674" },
      { btu:27300, kw:8.0,  kapasite:"8,0 kW",  kod:"WV5080M1", urunkod:"7955675" },
      { btu:30700, kw:9.0,  kapasite:"9,0 kW",  kod:"WV5090M1", urunkod:"7955676" },
    ], kumanda:"VWC-HRS01 (Kablosuz - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Duvar Tipi İç Ünite`,
  },
  "Orta Statik Kanal": {
    ikon: "≡",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"DVM5015M1", urunkod:"ZK07340" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"DVM5022M1", urunkod:"ZK07341" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"DVM5028M1", urunkod:"ZK07342" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"DVM5036M1", urunkod:"ZK07343" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"DVM5045M1", urunkod:"ZK07344" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"DVM5056M1", urunkod:"ZK07345" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"DVM5071M1", urunkod:"ZK07346" },
      { btu:27300, kw:8.0,  kapasite:"8,0 kW",  kod:"DVM5080M1", urunkod:"ZK07347" },
      { btu:30700, kw:9.0,  kapasite:"9,0 kW",  kod:"DVM5090M1", urunkod:"ZK07348" },
      { btu:38200, kw:11.2, kapasite:"11,2 kW", kod:"DVM5112M1", urunkod:"ZK07349" },
      { btu:47700, kw:14.0, kapasite:"14,0 kW", kod:"DVM5140M1", urunkod:"ZK07350" },
      { btu:54600, kw:16.0, kapasite:"16,0 kW", kod:"DVM5160M1", urunkod:"ZK07351" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Orta Statik Basınçlı Kanallı İç Ünite`,
  },
  "Yüksek Statik Kanal": {
    ikon: "⊟",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"DVHD5015M1", urunkod:"ZK07360" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"DVHD5022M1", urunkod:"ZK07361" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"DVHD5028M1", urunkod:"ZK07362" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"DVHD5036M1", urunkod:"ZK07363" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"DVHD5045M1", urunkod:"ZK07364" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"DVHD5056M1", urunkod:"ZK07365" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"DVHD5071M1", urunkod:"ZK07366" },
      { btu:27300, kw:8.0,  kapasite:"8,0 kW",  kod:"DVHD5080M1", urunkod:"ZK07367" },
      { btu:30700, kw:9.0,  kapasite:"9,0 kW",  kod:"DVHD5090M1", urunkod:"ZK07368" },
      { btu:38200, kw:11.2, kapasite:"11,2 kW", kod:"DVHD5112M1", urunkod:"ZK07369" },
      { btu:47700, kw:14.0, kapasite:"14,0 kW", kod:"DVHD5140M1", urunkod:"ZK07370" },
      { btu:54600, kw:16.0, kapasite:"16,0 kW", kod:"DVHD5160M1", urunkod:"ZK07371" },
      { btu:77100, kw:22.6, kapasite:"22,6 kW", kod:"DVHD5226M2", urunkod:"ZK07372" },
      { btu:95500, kw:28.0, kapasite:"28,0 kW", kod:"DVHD5280M2", urunkod:"ZK07373" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Yüksek Statik Basınçlı Kanallı İç Ünite`,
  },
  "Slim Kanal (DC Fan)": {
    ikon: "━",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"DVLD5015M1", urunkod:"ZK07380" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"DVLD5022M1", urunkod:"ZK07381" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"DVLD5028M1", urunkod:"ZK07382" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"DVLD5036M1", urunkod:"ZK07383" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"DVLD5045M1", urunkod:"ZK07384" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"DVLD5056M1", urunkod:"ZK07385" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"DVLD5071M1", urunkod:"ZK07386" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Düşük Statik Basınçlı Slim Kanallı İç Ünite (DC Fan)`,
  },
  "Slim Kanal (AC Fan)": {
    ikon: "─",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"DVLA5015M1", urunkod:"ZK07387" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"DVLA5022M1", urunkod:"ZK07388" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"DVLA5028M1", urunkod:"ZK07389" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"DVLA5036M1", urunkod:"ZK07390" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"DVLA5045M1", urunkod:"ZK07391" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"DVLA5056M1", urunkod:"ZK07392" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"DVLA5071M1", urunkod:"ZK07393" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Düşük Statik Basınçlı Slim Kanallı İç Ünite (AC Fan)`,
  },
  "Kabinsiz Döşeme": {
    ikon: "▱",
    btuler: [
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"CLV5022M1", urunkod:"ZK07410" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"CLV5028M1", urunkod:"ZK07411" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"CLV5036M1", urunkod:"ZK07412" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"CLV5045M1", urunkod:"ZK07413" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"CLV5056M1", urunkod:"ZK07414" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"CLV5071M1", urunkod:"ZK07415" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Kabinsiz Döşeme Tipi İç Ünite`,
  },
  "Taze Hava Kanallı": {
    ikon: "◈",
    btuler: [
      { btu:47700, kw:14.0, kapasite:"14,0 kW", kod:"FAV5140M2", urunkod:"ZK07420" },
      { btu:77100, kw:22.6, kapasite:"22,6 kW", kod:"FAV5226M2", urunkod:"ZK07421" },
      { btu:95500, kw:28.0, kapasite:"28,0 kW", kod:"FAV5280M2", urunkod:"ZK07422" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Taze Hava Kanallı İç Ünite`,
  },
  "Yer Tavan Tipi": {
    ikon: "⬛",
    btuler: [
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"FCV5028M1", urunkod:"ZK07390" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"FCV5036M1", urunkod:"ZK07391" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"FCV5045M1", urunkod:"ZK07392" },
      { btu:19100, kw:5.6,  kapasite:"5,6 kW",  kod:"FCV5056M1", urunkod:"ZK07393" },
      { btu:24200, kw:7.1,  kapasite:"7,1 kW",  kod:"FCV5071M1", urunkod:"ZK07394" },
      { btu:27300, kw:8.0,  kapasite:"8,0 kW",  kod:"FCV5080M1", urunkod:"ZK07395" },
      { btu:30700, kw:9.0,  kapasite:"9,0 kW",  kod:"FCV5090M1", urunkod:"ZK07396" },
      { btu:38200, kw:11.2, kapasite:"11,2 kW", kod:"FCV5112M1", urunkod:"ZK07397" },
      { btu:47700, kw:14.0, kapasite:"14,0 kW", kod:"FCV5140M1", urunkod:"ZK07398" },
    ], kumanda:"VWC-HRS01 (Kablosuz - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Yer Tavan Tipi İç Ünite`,
  },
  "Konsol Tipi": {
    ikon: "▰",
    btuler: [
      { btu:5100,  kw:1.5,  kapasite:"1,5 kW",  kod:"CSV5015M1", urunkod:"ZK07400" },
      { btu:7500,  kw:2.2,  kapasite:"2,2 kW",  kod:"CSV5022M1", urunkod:"ZK07401" },
      { btu:9500,  kw:2.8,  kapasite:"2,8 kW",  kod:"CSV5028M1", urunkod:"ZK07402" },
      { btu:12300, kw:3.6,  kapasite:"3,6 kW",  kod:"CSV5036M1", urunkod:"ZK07403" },
      { btu:15300, kw:4.5,  kapasite:"4,5 kW",  kod:"CSV5045M1", urunkod:"ZK07404" },
      { btu:17000, kw:5.0,  kapasite:"5,0 kW",  kod:"CSV5050M1", urunkod:"ZK07405" },
    ], kumanda:"VWCE17-A (Kablolu - Standart)", model:"Vitoclima 335-S",
    aciklamaFn: () => `Konsol Tipi İç Ünite`,
  },
};

// ─── DIŞ ÜNİTE LİSTESİ (kW'a göre sıralı) ──────────────────────────────────
const DIS_UNITELER = [
  { kod:"EU-OV5121M1", urunkod:"7955610", aciklama:"Mini VRF Dış Ünite - 1 Phase", kapasite:"12,1 kW / 4 HP",  kw:12.1, max_ic:7  },
  { kod:"EU-OV5141M1", urunkod:"7955611", aciklama:"Mini VRF Dış Ünite - 1 Phase", kapasite:"14,0 kW / 5 HP",  kw:14.0, max_ic:8  },
  { kod:"EU-OV5120M1", urunkod:"7955612", aciklama:"Mini VRF Dış Ünite - 1 Phase (Çift Fan)", kapasite:"12,1 kW / 4 HP", kw:12.1, max_ic:8 },
  { kod:"EU-OV5140M1", urunkod:"7955613", aciklama:"Mini VRF Dış Ünite - 1 Phase (Çift Fan)", kapasite:"14,0 kW / 5 HP", kw:14.0, max_ic:10 },
  { kod:"EU-OV5160M1", urunkod:"7955614", aciklama:"Mini VRF Dış Ünite - 1 Phase (Çift Fan)", kapasite:"15,5 kW / 6 HP", kw:15.5, max_ic:13 },
  { kod:"EU-OV3224TS1",urunkod:"7955633", aciklama:"Slim VRF Heat-Pump Dış Ünite - 3 Phase", kapasite:"22,6 kW / 8 HP",  kw:22.6, max_ic:13 },
  { kod:"EU-OV3280TS1",urunkod:"7955634", aciklama:"Slim VRF Heat-Pump Dış Ünite - 3 Phase", kapasite:"28,0 kW / 10 HP", kw:28.0, max_ic:16 },
  { kod:"EU-OV3335TS1",urunkod:"7955635", aciklama:"Slim VRF Heat-Pump Dış Ünite - 3 Phase", kapasite:"33,5 kW / 12 HP", kw:33.5, max_ic:19 },
  { kod:"OV5224T1", urunkod:"7955620", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"25,2 kW / 8 HP",  kw:25.2, max_ic:13 },
  { kod:"OV5280T1", urunkod:"7955621", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"28,0 kW / 10 HP", kw:28.0, max_ic:16 },
  { kod:"OV5335T1", urunkod:"7955622", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"33,5 kW / 12 HP", kw:33.5, max_ic:20 },
  { kod:"OV5400T1", urunkod:"7955623", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"40,0 kW / 14 HP", kw:40.0, max_ic:24 },
  { kod:"OV5450T1", urunkod:"7955624", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"45,0 kW / 16 HP", kw:45.0, max_ic:27 },
  { kod:"OV5504T1", urunkod:"7955625", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"50,4 kW / 18 HP", kw:50.4, max_ic:30 },
  { kod:"OV5560T1", urunkod:"7955626", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"56,0 kW / 20 HP", kw:56.0, max_ic:33 },
  { kod:"OV5615T1", urunkod:"7955627", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"61,5 kW / 22 HP", kw:61.5, max_ic:36 },
  { kod:"OV5680T1", urunkod:"7955628", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"68,0 kW / 24 HP", kw:68.0, max_ic:40 },
  { kod:"OV5730T1", urunkod:"7955629", aciklama:"All DC Inverter VRF Dış Ünite - 3 Phase", kapasite:"73,5 kW / 26 HP", kw:73.5, max_ic:43 },
];

const BRANSMANLAR = [
  { kod:"VBJTRFQ01/A",  urunkod:"7521581", model:"Vitoclima 333-S", aciklama:"İç Ünite İçin Branşman (X<20)",     limit_max:20 },
  { kod:"VBJTRFQ01B/A", urunkod:"7521582", model:"Vitoclima 333-S", aciklama:"İç Ünite İçin Branşman (20<X<30)", limit_min:20, limit_max:30 },
  { kod:"VBJTRFQ02/A",  urunkod:"7521583", model:"Vitoclima 333-S", aciklama:"İç Ünite İçin Branşman (30<X<70)", limit_min:30, limit_max:70 },
];

// ─── BRANŞMAN HESABI ─────────────────────────────────────────────────────────
// Her joint'in kapasitesi = dış üniteden uzaklaştıkça azalan downstream kW toplamı.
// Büyükten küçüğe sırala → her adımda büyük birimi çıkar → kalan = o joint kapasitesi.
function bransmanHesapla(icKwList) {
  if (icKwList.length < 2) return [];
  const siralı = [...icKwList].sort((a, b) => b - a);
  let kalan = siralı.reduce((s, k) => s + k, 0);
  const counts = { q02:0, q01b:0, q01a:0 };
  for (let i = 0; i < siralı.length - 1; i++) {
    kalan -= siralı[i];
    if (kalan >= 30)      counts.q02++;
    else if (kalan >= 20) counts.q01b++;
    else                  counts.q01a++;
  }
  const result = [];
  if (counts.q02  > 0) result.push({ ...BRANSMANLAR[2], adet: counts.q02,  tip:"bransman" });
  if (counts.q01b > 0) result.push({ ...BRANSMANLAR[1], adet: counts.q01b, tip:"bransman" });
  if (counts.q01a > 0) result.push({ ...BRANSMANLAR[0], adet: counts.q01a, tip:"bransman" });
  return result;
}

// ─── DIŞ ÜNİTE OTO SEÇİM ─────────────────────────────────────────────────────
function disUniteOner(toplamKw, toplamAdet) {
  // Kombinasyon %50-130: min outdoor = toplamKw/1.3, max = toplamKw/0.5
  const min = toplamKw / 1.3;
  const candidates = DIS_UNITELER
    .filter(d => d.kw >= min && d.max_ic >= toplamAdet)
    .sort((a, b) => a.kw - b.kw);
  return candidates[0] || null;
}

// ─── ANA COMPONENT ────────────────────────────────────────────────────────────
const newRow = () => ({ id: Date.now() + Math.random(), tip: "4 Yön Dairesel Kaset", btu: null, adet: 1 });

export default function App() {
  const [step, setStep] = useState(1); // 1:talep 2:oneri 3:teklif
  const [info, setInfo] = useState({ firma:"EREMİZ", proje:"", yetkili:"BATUHAN İSKENDER", iletisim:"" });
  const [talepler, setTalepler] = useState([newRow()]);
  const [secilenDis, setSecilenDis] = useState(null); // override
  const [fiyatlar, setFiyatlar] = useState({});
  const today = new Date().toLocaleDateString("tr-TR", { day:"2-digit", month:"2-digit", year:"numeric" });

  // ── Talep hesapları ──────────────────────────────────────────────────────
  const hesap = useMemo(() => {
    const gecerli = talepler.filter(t => t.btu);
    const icKwList = [];
    gecerli.forEach(t => {
      const tipData = IC_TIPLER[t.tip];
      const btuData = tipData?.btuler.find(b => b.btu === t.btu);
      if (btuData) for (let i = 0; i < t.adet; i++) icKwList.push(btuData.kw);
    });
    const toplamKw   = icKwList.reduce((s, k) => s + k, 0);
    const toplamAdet = icKwList.length;
    const onerileDis = disUniteOner(toplamKw, toplamAdet);
    const aktifDis   = secilenDis ?? onerileDis;
    const kombin     = aktifDis ? (toplamKw / aktifDis.kw * 100) : 0;
    const kombOk     = kombin >= 50 && kombin <= 130 && toplamAdet <= (aktifDis?.max_ic || 0);
    const bransmanlar = bransmanHesapla(icKwList);
    return { gecerli, icKwList, toplamKw, toplamAdet, onerileDis, aktifDis, kombin, kombOk, bransmanlar };
  }, [talepler, secilenDis]);

  // ── Teklif satırları (Step 3 için) ──────────────────────────────────────
  const teklifSatirlari = useMemo(() => {
    if (!hesap.aktifDis) return [];
    const satirlar = [];
    // Dış ünite
    satirlar.push({ ...hesap.aktifDis, model:"Vitoclima 335-S", adet:1, tip:"dis", kapasite: hesap.aktifDis.kapasite });
    // İç üniteler (gruplandır)
    const gruplar = {};
    hesap.gecerli.forEach(t => {
      const tipData = IC_TIPLER[t.tip];
      const btuData = tipData?.btuler.find(b => b.btu === t.btu);
      if (!btuData) return;
      const key = btuData.kod;
      if (!gruplar[key]) {
        gruplar[key] = {
          ...btuData, tip:"ic", adet:0,
          model: tipData.model,
          aciklama: tipData.aciklamaFn(btuData.kapasite),
          kumanda: tipData.kumanda,
          kw: btuData.kw,
        };
      }
      gruplar[key].adet += t.adet;
    });
    Object.values(gruplar).forEach(g => satirlar.push(g));
    // Branşmanlar
    hesap.bransmanlar.forEach(b => satirlar.push(b));
    return satirlar;
  }, [hesap]);

  // ── Toplam fiyat ────────────────────────────────────────────────────────
  const toplam = teklifSatirlari.reduce((s, u) => {
    const f = parseFloat(String(fiyatlar[u.kod] || "").replace(",",".")) || 0;
    return s + f * u.adet;
  }, 0);
  const toplamStr = toplam > 0 ? `$${toplam.toLocaleString("tr-TR", {minimumFractionDigits:1,maximumFractionDigits:1})}` : "—";

  // ─── TALEP ADIMI ────────────────────────────────────────────────────────────
  if (step === 1) return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", background:"#0f172a", minHeight:"100vh", padding:"20px 16px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:C.red, fontWeight:700, marginBottom:4 }}>VIESSMANN</div>
          <div style={{ fontSize:22, fontWeight:900, color:"#fff", marginBottom:4 }}>VRF Sistem Teklif Sihirbazı</div>
          <div style={{ fontSize:13, color:"#64748b" }}>İhtiyacınızı girin — sistem dış üniteyi ve branşmanları otomatik seçer</div>
        </div>

        {/* Müşteri */}
        <div style={sCard}>
          <div style={sSec}>📋 Müşteri & Proje</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[["firma","Firma Adı"],["proje","Proje Adı"],["yetkili","Yetkili"],["iletisim","İletişim"]].map(([k,l]) => (
              <div key={k}>
                <label style={sLabel}>{l}</label>
                <input style={sInput} value={info[k]} onChange={e => setInfo(p=>({...p,[k]:e.target.value}))} />
              </div>
            ))}
          </div>
        </div>

        {/* Talep listesi */}
        <div style={sCard}>
          <div style={sSec}>❄️ İç Ünite Talepleri</div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1.4fr 80px 36px", gap:8, marginBottom:8 }}>
            {["Tip","Kapasite (BTU)","Adet",""].map(h => <div key={h} style={sLabel}>{h}</div>)}
          </div>
          {talepler.map((row, i) => {
            const tipData = IC_TIPLER[row.tip];
            return (
              <div key={row.id} style={{ display:"grid", gridTemplateColumns:"2fr 1.4fr 80px 36px", gap:8, marginBottom:8, alignItems:"center" }}>
                {/* Tip */}
                <select style={sInput} value={row.tip} onChange={e => setTalepler(p => p.map((r,ri) => ri===i ? {...r, tip:e.target.value, btu:null} : r))}>
                  {Object.keys(IC_TIPLER).map(t => <option key={t} value={t}>{IC_TIPLER[t].ikon} {t}</option>)}
                </select>
                {/* BTU */}
                <select style={sInput} value={row.btu || ""} onChange={e => setTalepler(p => p.map((r,ri) => ri===i ? {...r, btu:Number(e.target.value)} : r))}>
                  <option value="">— BTU seç —</option>
                  {tipData?.btuler.map(b => (
                    <option key={b.btu} value={b.btu}>
                      {b.btu.toLocaleString("tr-TR")} BTU ({b.kapasite})
                    </option>
                  ))}
                </select>
                {/* Adet */}
                <input type="number" min={1} max={50} style={sInput} value={row.adet}
                  onChange={e => setTalepler(p => p.map((r,ri) => ri===i ? {...r, adet:Math.max(1,Number(e.target.value))} : r))} />
                {/* Sil */}
                <button onClick={() => setTalepler(p => p.filter((_,ri) => ri!==i))}
                  style={{ background:"rgba(239,68,68,0.2)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171", borderRadius:8, cursor:"pointer", fontSize:16, height:38 }}>×</button>
              </div>
            );
          })}
          <button onClick={() => setTalepler(p => [...p, newRow()])}
            style={{ background:"rgba(59,130,246,0.15)", border:"1px dashed #3b82f6", color:"#93c5fd", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontSize:13, width:"100%", marginTop:4 }}>
            + Satır Ekle
          </button>
        </div>

        {/* Anlık özet */}
        {hesap.toplamKw > 0 && (
          <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"14px 18px", marginBottom:16, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
            <Stat label="Toplam İç Kapasite" value={`${hesap.toplamKw.toFixed(1)} kW`} />
            <Stat label="Toplam İç Ünite" value={`${hesap.toplamAdet} adet`} />
            <Stat label="Önerilen Dış Ünite" value={hesap.onerileDis?.kod || "—"} color={hesap.onerileDis ? "#86efac" : "#f87171"} />
          </div>
        )}

        <button
          onClick={() => { setSecilenDis(null); setStep(2); }}
          disabled={hesap.gecerli.length === 0 || !hesap.onerileDis}
          style={{ ...sBtnPrimary, width:"100%", opacity: hesap.gecerli.length > 0 && hesap.onerileDis ? 1 : 0.4 }}>
          Sistemi Oluştur →
        </button>
        {hesap.gecerli.length > 0 && !hesap.onerileDis && (
          <div style={{ color:"#f87171", fontSize:12, textAlign:"center", marginTop:8 }}>
            ⚠ Toplam kapasite mevcut tek dış ünite limitlerini aşıyor. Kapasiteyi düşürün veya ürün listesini kontrol edin.
          </div>
        )}
      </div>
    </div>
  );

  // ─── ÖNERİ ADIMI ────────────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", background:"#0f172a", minHeight:"100vh", padding:"20px 16px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:C.red, fontWeight:700, marginBottom:4 }}>VIESSMANN</div>
          <div style={{ fontSize:20, fontWeight:900, color:"#fff" }}>Sistem Önerisi</div>
        </div>

        {/* Kombinasyon özeti */}
        <div style={{ background: hesap.kombOk ? "rgba(34,197,94,0.1)" : "rgba(251,191,36,0.1)", border:`1px solid ${hesap.kombOk ? "rgba(34,197,94,0.4)" : "rgba(251,191,36,0.4)"}`, borderRadius:12, padding:"14px 18px", marginBottom:16, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          <Stat label="İç Kapasite" value={`${hesap.toplamKw.toFixed(1)} kW`} />
          <Stat label="Dış Kapasite" value={`${hesap.aktifDis?.kw?.toFixed(1)} kW`} />
          <Stat label="Kombinasyon" value={`%${hesap.kombin.toFixed(1)}`} color={hesap.kombOk ? "#86efac" : "#fbbf24"} />
          <Stat label="İç Ünite Adedi" value={`${hesap.toplamAdet} / ${hesap.aktifDis?.max_ic}`} color={hesap.toplamAdet <= (hesap.aktifDis?.max_ic||0) ? "#86efac" : "#f87171"} />
        </div>

        {/* Dış ünite seçimi */}
        <div style={sCard}>
          <div style={sSec}>🌡 Dış Ünite</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
            {DIS_UNITELER.filter(d => d.kw >= hesap.toplamKw / 1.5 && d.kw <= hesap.toplamKw * 2).map(d => (
              <button key={d.kod} onClick={() => setSecilenDis(d)}
                style={{ padding:"8px 12px", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600, border:"none",
                  background: hesap.aktifDis?.kod === d.kod ? C.red : "rgba(255,255,255,0.08)",
                  color: hesap.aktifDis?.kod === d.kod ? "#fff" : "#94a3b8",
                  outline: hesap.onerileDis?.kod === d.kod && hesap.aktifDis?.kod !== d.kod ? "2px dashed #3b82f6" : "none" }}>
                {d.kod}
                {hesap.onerileDis?.kod === d.kod && <span style={{ fontSize:10, marginLeft:4, color:"#93c5fd" }}>✦ Önerilen</span>}
              </button>
            ))}
          </div>
          {hesap.aktifDis && (
            <div style={{ fontSize:12, color:"#94a3b8" }}>
              <strong style={{ color:"#e2e8f0" }}>{hesap.aktifDis.kod}</strong> — {hesap.aktifDis.aciklama} — {hesap.aktifDis.kapasite} — Max {hesap.aktifDis.max_ic} iç ünite
            </div>
          )}
        </div>

        {/* İç ünite özeti */}
        <div style={sCard}>
          <div style={sSec}>❄️ İç Üniteler</div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead><tr style={{ borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
              {["Tip","Model Kodu","Kapasite","Adet","Toplam kW"].map(h => <th key={h} style={{ padding:"6px 8px", textAlign:"left", color:"#64748b", fontWeight:600, fontSize:11 }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {hesap.gecerli.map((t, i) => {
                const tipData = IC_TIPLER[t.tip];
                const btuData = tipData?.btuler.find(b => b.btu === t.btu);
                if (!btuData) return null;
                return (
                  <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding:"7px 8px", color:"#94a3b8" }}>{tipData.ikon} {t.tip}</td>
                    <td style={{ padding:"7px 8px", fontWeight:700, color:"#60a5fa" }}>{btuData.kod}</td>
                    <td style={{ padding:"7px 8px", color:"#e2e8f0" }}>{btuData.kapasite}</td>
                    <td style={{ padding:"7px 8px", color:"#e2e8f0" }}>{t.adet}</td>
                    <td style={{ padding:"7px 8px", color:"#86efac" }}>{(btuData.kw * t.adet).toFixed(1)} kW</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Branşmanlar */}
        <div style={sCard}>
          <div style={sSec}>🔧 Otomatik Hesaplanan Branşmanlar</div>
          {hesap.bransmanlar.length === 0
            ? <div style={{ color:"#64748b", fontSize:13 }}>İç ünite sayısı 1 — branşman gerekmez.</div>
            : hesap.bransmanlar.map((b, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", fontSize:13 }}>
                <div>
                  <span style={{ fontWeight:700, color:"#fbbf24" }}>{b.kod}</span>
                  <span style={{ color:"#64748b", marginLeft:8 }}>{b.aciklama}</span>
                </div>
                <span style={{ fontWeight:700, color:"#e2e8f0" }}>{b.adet} adet</span>
              </div>
            ))
          }
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => setStep(1)} style={sBtnGrey}>← Düzenle</button>
          <button onClick={() => setStep(3)} style={{ ...sBtnPrimary, flex:1 }} disabled={!hesap.kombOk}>
            {hesap.kombOk ? "Fiyat Gir & Teklif Oluştur →" : "⚠ Kombinasyon Uygun Değil"}
          </button>
        </div>
      </div>
    </div>
  );

  // ─── TEKLİF ADIMI (Fiyat + Print) ───────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Segoe UI',sans-serif", background:"#f1f5f9", minHeight:"100vh", padding:20 }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ display:"flex", gap:10, marginBottom:16 }}>
          <button onClick={() => setStep(2)} style={sBtnGrey}>← Geri</button>
          <button onClick={() => setStep(1)} style={sBtnGrey}>↺ Başa Dön</button>
          <button onClick={() => window.print()} style={{ ...sBtnPrimary, marginLeft:"auto" }}>🖨 Yazdır / PDF</button>
        </div>

        {/* Fiyat giriş paneli */}
        <div style={{ background:"#fff", borderRadius:12, padding:"16px 18px", marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }} className="no-print">
          <div style={{ fontWeight:700, fontSize:13, color:"#0f172a", marginBottom:12 }}>💰 Fiyat Girişi (opsiyonel)</div>
          <div style={{ display:"grid", gap:8 }}>
            {teklifSatirlari.map((s, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #f1f5f9" }}>
                <div style={{ fontSize:13 }}>
                  <span style={{ fontWeight:700, color:"#1e40af" }}>{s.kod}</span>
                  <span style={{ color:"#64748b", marginLeft:8, fontSize:12 }}>{s.aciklama} · {s.adet} adet</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:12, color:"#64748b" }}>Birim $:</span>
                  <input type="text" value={fiyatlar[s.kod]||""} onChange={e => setFiyatlar(p=>({...p,[s.kod]:e.target.value}))}
                    placeholder="0.00" style={{ width:90, padding:"5px 8px", border:"1px solid #d1d5db", borderRadius:7, fontSize:13 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* YAZDIRILACAK TEKLİF */}
        <div id="print-area" style={{ background:"#fff", padding:"40px 48px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", borderRadius:4 }}>
          {/* Logo */}
          <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:28 }}>
            <div style={{ fontSize:26, fontWeight:900, color:C.red, letterSpacing:-1, fontFamily:"Arial Black,sans-serif" }}>VIE<span>S</span>SMANN</div>
          </div>
          {/* Müşteri */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:40, marginBottom:24 }}>
            <div style={{ fontSize:13 }}>
              {[["Firma Adı",info.firma],["Proje Adı",info.proje],["Yetkili",info.yetkili],["İletişim",info.iletisim]].map(([k,v]) => v ? (
                <div key={k} style={{ display:"flex", marginBottom:4 }}>
                  <span style={{ width:80, color:"#374151", fontWeight:500 }}>{k}</span>
                  <span style={{ color:"#374151" }}>: {v}</span>
                </div>
              ) : null)}
            </div>
            <div style={{ fontSize:13, textAlign:"right" }}>
              <span style={{ color:"#374151" }}>Tarih : </span><strong>{today}</strong>
            </div>
          </div>
          {/* Başlık */}
          <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:14, borderBottom:"2px solid #0f172a", paddingBottom:6 }}>
            Viessmann VRF Sistem Cihaz + Aksesuar Fiyat Teklifi
          </div>
          {/* Tablo */}
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["Ürün Kodu","Model","Açıklama","Model Kodu","Kapasite","Adet","Birim Fiyat","Toplam"].map(h => (
                  <th key={h} style={{ padding:"8px 6px", textAlign:"left", color:"#374151", fontWeight:700, borderTop:"1px solid #cbd5e1", borderBottom:"1px solid #cbd5e1", fontSize:11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teklifSatirlari.map((s, i) => {
                const birimF = parseFloat(String(fiyatlar[s.kod]||"").replace(",",".")) || 0;
                const topF = birimF * s.adet;
                return (
                  <tr key={i} style={{ borderBottom:"1px solid #f1f5f9", background:i%2===0?"#fff":"#f9fafb" }}>
                    <td style={sTd}>{s.urunkod||""}</td>
                    <td style={sTd}>{s.model||"Vitoclima 335-S"}</td>
                    <td style={{ ...sTd, maxWidth:180 }}>{s.aciklama}</td>
                    <td style={{ ...sTd, fontWeight:700, color:"#1e40af" }}>{s.kod}</td>
                    <td style={{ ...sTd, whiteSpace:"nowrap" }}>{s.kapasite||""}</td>
                    <td style={{ ...sTd, textAlign:"center" }}>{s.adet}</td>
                    <td style={{ ...sTd, textAlign:"right" }}>{birimF>0?`$${birimF.toLocaleString("tr-TR",{minimumFractionDigits:1})}`:"—"}</td>
                    <td style={{ ...sTd, textAlign:"right", fontWeight:600 }}>{topF>0?`$${topF.toLocaleString("tr-TR",{minimumFractionDigits:1})}`:"—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Toplam */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16, background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:4, padding:"12px 16px" }}>
            <span style={{ fontWeight:700, fontSize:14 }}>Viessmann VRF Cihaz & Aksesuar Bedeli</span>
            <span style={{ fontWeight:800, fontSize:16 }}>{toplamStr}</span>
          </div>
          {/* Şartlar */}
          <div style={{ marginTop:24, fontSize:11, color:"#374151", lineHeight:1.8 }}>
            <b>Fiyatlarımıza KDV dahil değildir.</b><br/>
            Fiyatlarımıza montaj ve işçilik bedelleri dahil değildir.<br/>
            Cihazlarımız 2 (iki) yıl garantimiz altındadır. Yurt içi nakliye bedelli teslim alınır.<br/>
            Fiyatlarımız peşin fiyatlar olup vadeli satışlarda aylık %4 vade farkı, kredi kartı ile satışlar %15 kart komisyonu fiyatlara dahil edilecektir.
            <div style={{ fontWeight:700, marginTop:8 }}>Teslimat</div>
            - Temin edilebilir ürünler stoklar ile sınırlıdır. Karşılıklı görüşme ile teslimat planlanacaktır.<br/>
            - Stokta olmayan ürünler için teslim tarihi ayrıca bildirilecektir.<br/>
            - Sipariş verilen stok ürünler depo nakliye programına bağlı olarak sevk edilecektir.<br/>
            - Ürünler talep edilen sevk adresine araç üzerinde teslim edilecektir. Her türlü taşıma teklif hariçtir.<br/>
            - Ürünlerin tam ve eksiksiz olarak irsaliye ile tesliminden itibaren sorumluluk müşteriye aittir.
            <div style={{ fontWeight:700, marginTop:8 }}>Garanti Kapsamı</div>
            - Cihazlar yetkili servis tarafından devreye alım tarihinden itibaren 2 yıl firmamız garantisi altındadır.<br/>
            - Yetkili servis tarafından devreye alınmadan çalıştırılan cihazlar garanti dışıdır.
            <div style={{ fontWeight:700, marginTop:8 }}>Hariç Olan İşler</div>
            - Montaj malzeme ve işçilik bedelleri &nbsp;|&nbsp; Elektrik enerjisi temini ve montajı<br/>
            - Her türlü Vinç-Forklift kiralama hizmetleri &nbsp;|&nbsp; Tüm inşai ve dekoratif işler
          </div>
        </div>
      </div>
      <style>{`@media print{.no-print{display:none!important}#print-area{box-shadow:none;padding:15mm}body{background:#fff}}`}</style>
    </div>
  );
}

// ─── YARDIMCI COMPONENTLER ────────────────────────────────────────────────────
function Stat({ label, value, color }) {
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontSize:10, color:"#64748b", marginBottom:2 }}>{label}</div>
      <div style={{ fontSize:16, fontWeight:800, color: color || "#e2e8f0" }}>{value}</div>
    </div>
  );
}

// ─── STİLLER ─────────────────────────────────────────────────────────────────
const sCard = { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"16px 18px", marginBottom:14 };
const sSec  = { fontWeight:700, fontSize:13, color:"#e2e8f0", marginBottom:12, paddingBottom:8, borderBottom:"1px solid rgba(255,255,255,0.08)" };
const sLabel = { display:"block", fontSize:11, color:"#64748b", marginBottom:4, fontWeight:500 };
const sInput = { width:"100%", padding:"8px 10px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, color:"#e2e8f0", fontSize:13, boxSizing:"border-box", outline:"none" };
const sBtnPrimary = { background:C.red, color:"#fff", border:"none", borderRadius:10, padding:"11px 24px", fontWeight:700, cursor:"pointer", fontSize:14 };
const sBtnGrey = { background:"rgba(255,255,255,0.08)", color:"#94a3b8", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, padding:"11px 20px", fontWeight:700, cursor:"pointer", fontSize:14 };
const sTd = { padding:"7px 6px", color:"#374151", verticalAlign:"top", fontSize:11 };
