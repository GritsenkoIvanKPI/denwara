# CLIENT_BRIEF — Denwara

## Firma
Denwara — arborystyka + ландшафт / landscaping. Jako wspólna marka od 2024 r.;
każdy ze współzałożycieli ma 3–4 lata praktyki w branży przed połączeniem sił.

## Rynek i język
- **Lokalizacja:** Warszawa, zasięg — całe województwo mazowieckie (~60 km od Warszawy).
- **Język strony: POLSKI** (potwierdzone z klientem). Wizytówka Google jest po polsku:
  „Denwara – Usługi wycinka drzew i pielęgnacji ogrodu".
- Brief źródłowy: `Бриф _ Denwara.txt` (po ukraińsku).

## Cel projektu
Nowoczesna, wielostronicowa witryna pod **kampanie reklamowe (Google Ads) i późniejsze SEO**.
Etap 1 = strona główna (zrobione). Kolejne strony w następnych sesjach.

## Struktura strony głównej (zatwierdzona)
Header → Hero → Usługi → CTA → O nas → Proces → CTA → Opinie (Google) → FAQ → Mapa/obszar → Kontakt → Stopka

## Usługi
1. **Arborystyka** — wycinka i usuwanie drzew (alpinistycznie, sekcjami), kronowanie,
   cięcia sanitarne/formujące/odmładzające, wzmacnianie koron (cabling),
   rozdrabnianie gałęzi w rębaku, wywóz odpadów.
2. **Ogrody / architektura krajobrazu** — projektowanie + wizualizacje 3D, ozelenienie,
   rolowany trawnik, wielkowymiarowe nasadzenia, bruk i płyty, tarasy (drewno / DPK),
   oświetlenie ogrodowe, automatyczne nawadnianie i drenaż, stała opieka sezonowa.
3. **Klining eksterieru** — mycie ciśnieniowe bruku, elewacji, dachów.
4. **Sprzedaż materiałów** — mulcz, drewno opałowe.

## Przewagi (do eksponowania w tekstach)
- Pełny cykl „pod klucz": od karczowania po finalne mycie kostki. Jeden wykonawca.
- Tempo i dotrzymane terminy — własna ekipa, zorganizowane procesy.
- Jeden punkt odpowiedzialności — brak przerzucania winy między brygadami.
- Sprzęt bez oszczędzania: **Stihl** (spalinowy), **Bobcat** (ciężki), **Fiskars** (ręczny).

## Obiekcje klientów
Efekt estetyczny („czy wyjdzie tak, jak sobie wyobrażam?"), cena i zasadność inwestycji,
strach o terminy, wątpliwość co do sprzętu i profesjonalizmu ekipy.

## Liczby
1000+ obsłużonych drzew · 200+ obiektów · 3–4 lata stażu każdego z założycieli ·
praca 12 miesięcy w roku (zima = najlepszy czas na trudne wycinki i drewno opałowe).

## Design
- Wzorzec: `desktop.png` (szablon „Rennox") — trzymamy się go 1:1, kolor czerwony
  zamieniony na markowy pomarańczowy.
- **Kolor marki:** `#F37A1F`. Dodatkowe: `#FFFFFF`, `#1F1F1F`, `#C3DC4F`, `#F1EEDB`.
- Typografia: Oswald (display, wersaliki) + Manrope (tekst).
- **Uwaga:** polskie znaki diakrytyczne (Ę, Ą, Ó, Ż, Ś, Ł) wymagają `line-height`
  ≥ 1.08 w nagłówkach i ≥ 1.2 w przyciskach — przy `line-height:1` ogonki są ucinane.

## Decyzje techniczne
- Bez Tailwind CDN — ręczny CSS w `<style>` (Core Web Vitals pod Google Ads).
- Opinie Google: statyczne karty gotowe pod podpięcie Places API (bez klucza na tym etapie).
- Mapa Google: ładowana dopiero po kliknięciu (poster + `Pokaż mapę Google`).

## DO PODMIANY przed publikacją
Telefon, e-mail, adres, NIP, link do wizytówki Google, treści opinii + realna ocena,
logo, `action` formularza (backend/CRM), linki social, polityka prywatności.

## Obrazy
Wygenerowane przez Gemini (`gemini-3-pro-image-preview`), zapisane jako WebP
w `assets/img/` (~3 MB łącznie). Prompty i workflow: `GEMINI_IMAGE_GENERATION.md`.

## Serwer lokalny
Porty 3000/3100/3400 są zajęte przez inne projekty — ten projekt serwujemy na **3200**:
`PORT=3200 node serve.mjs` → `node screenshot.mjs http://localhost:3200 <label>`
