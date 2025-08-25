# Garden Bubbles (React + Vite + Tailwind + Framer Motion)

Animierte Blasen, die **aufpoppen** und beim Klicken **zerplatzen** – komplett ohne Tastatureingaben. Klicks zählen als Anzahl (mehrfaches Tippen). Am Ende wird ein einfacher Garten-Plan berechnet.

## 📁 So legst du es in GitHub ab
1. In deinem Repo einen Ordner anlegen, z. B. `garden-bubbles`.
2. Den Inhalt dieses ZIPs dort hineinkopieren und committen/pushen.

## ▶️ Lokal starten
```bash
cd garden-bubbles
npm install
npm run dev
# öffnet http://localhost:5173
```

## 🧩 Stack
- React 18, Vite
- Tailwind CSS
- Framer Motion (Animation der Blasen)

## 🧠 Logik
- Keine Eingabefelder. Alles über Blasen-Klicks.
- Mehrfach-Klick = höhere Anzahl.
- Einfache Heuristik leitet Hochbeete, Wasserbedarf, Tankgröße etc. ab.

## 🔗 Optional: Integration in Streamlit
- Baue später eine Streamlit-Komponente und sende die Klick-Events ans Python-Backend.
- Docs: https://docs.streamlit.io/library/components

## 📦 Build
```bash
npm run build
npm run preview
```

Viel Spaß! 🌱
