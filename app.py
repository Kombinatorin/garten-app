import streamlit as st

st.set_page_config(page_title="Gartenplanungs-App", layout="centered")

st.title("🌱 Garten-Planungs-App (Bubble-UI)")

# Schritt 1: Ziele
st.header("1. Ziele")
ziele = st.multiselect(
    "Was möchtest du mit deinem Garten erreichen?",
    ["Mehr Autarkie", "Gesunde Ernährung", "Bessere Ressourcennutzung", "Schönerer Garten", "Erholung & Freizeit"]
)

# Schritt 2: Anbauwünsche
st.header("2. Anbauwünsche")
anbau = st.multiselect(
    "Welche Pflanzen möchtest du anbauen?",
    ["Gemüse", "Obst", "Kräuter", "Blumen", "Bäume"]
)

# Schritt 3: Ressourcen
st.header("3. Ressourcen")
wasser = st.radio("Hast du Zugang zu Wasser?", ["Ja", "Nein"])
strom = st.radio("Hast du Zugang zu Strom?", ["Ja", "Nein"])

# Schritt 4: Fläche, Gebäude, Budget
st.header("4. Fläche & Budget")
flaeche = st.slider("Wie groß ist die Fläche (m²)?", 5, 2000, 100)
gebaeude = st.multiselect(
    "Welche Gebäude/Strukturen gibt es?",
    ["Gewächshaus", "Schuppen", "Zaun", "Kompost", "Keins"]
)
budget = st.select_slider("Welches Budget hast du?", options=["Sehr niedrig", "Niedrig", "Mittel", "Hoch", "Sehr hoch"])

# Schritt 5: Automatischer Plan
st.header("5. Dein Gartenplan")
if st.button("📋 Plan erstellen"):
    st.success("Hier ist dein personalisierter Gartenplan:")
    st.write("**Ziele:**", ", ".join(ziele) if ziele else "Keine angegeben")
    st.write("**Anbauwünsche:**", ", ".join(anbau) if anbau else "Keine angegeben")
    st.write("**Wasser:**", wasser)
    st.write("**Strom:**", strom)
    st.write("**Fläche:**", f"{flaeche} m²")
    st.write("**Gebäude:**", ", ".join(gebaeude) if gebaeude else "Keine")
    st.write("**Budget:**", budget)

    # Kleine Logik: Empfehlungen
    empfehlungen = []
    if "Gemüse" in anbau and wasser == "Ja":
        empfehlungen.append("Ein Gemüsebeet mit Bewässerungssystem wäre sinnvoll.")
    if "Obst" in anbau and flaeche > 100:
        empfehlungen.append("Du kannst ein oder mehrere Obstbäume pflanzen.")
    if budget in ["Hoch", "Sehr hoch"] and "Gewächshaus" not in gebaeude:
        empfehlungen.append("Ein Gewächshaus könnte deine Erträge stark erhöhen.")
    if not empfehlungen:
        empfehlungen.append("Starte klein und erweitere Schritt für Schritt.")

    st.subheader("🌿 Empfehlungen")
    for e in empfehlungen:
        st.write("- ", e)
