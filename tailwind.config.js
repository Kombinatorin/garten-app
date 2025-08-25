/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        bubble: "#eef2ff",
        bubbleActive: "#dbeafe",
        accent: "#6366f1",
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.15)",
      }
    },
  },
  plugins: [],
}
