import streamlit as st
import random
import streamlit.components.v1 as components

# --- Page config ---
st.set_page_config(page_title="Garden Bubbles App", layout="wide")

# --- Load custom CSS & JS ---
with open("assets/style.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

with open("assets/bubble.js") as f:
    js_code = f.read()
components.html(f"<script>{js_code}</script>", height=0)

# --- Title ---
st.title("🌱 Garden Bubbles App")
st.write("Klicke auf die Blasen, um deine Garten-Optionen auszuwählen!")

# --- Example categories ---
categories = {
    "Wasser": ["Regenwasser", "Leitungswasser", "Brunnen", "Pumpe"],
    "Strom": ["Solar", "Netzstrom", "Batterie"],
    "Ziele": ["Autarkie", "Gesunde Ernährung", "Ressourcen sparen"]
}

# --- Show bubbles ---
for main_cat, options in categories.items():
    st.subheader(main_cat)
    cols = st.columns(len(options))
    for i, opt in enumerate(options):
        with cols[i]:
            if st.button(f"💧 {opt}" if main_cat=="Wasser" else f"🌞 {opt}"):
                st.success(f"Du hast **{opt}** gewählt!")
