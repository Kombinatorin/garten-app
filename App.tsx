import { motion, AnimatePresence } from 'framer-motion'
import React, { useMemo, useState } from 'react'

type CounterMap = Record<string, number>

type Section = {
  key: string
  title: string
  options: string[]
}

const SECTIONS: Section[] = [
  {
    key: 'goals',
    title: 'Was möchtest du erreichen?',
    options: ['Gesündere Ernährung','Teil-Autarkie','Ressourcennutzung verbessern','Strom sparen','Investition','Schöneres Zuhause','Nachhaltigkeit']
  },
  {
    key: 'crops',
    title: 'Was möchtest du anbauen?',
    options: ['Tomaten','Salat','Kräuter','Erdbeeren','Kartoffeln','Zucchini','Bohnen','Kürbis','Paprika','Apfelbaum']
  },
  {
    key: 'water',
    title: 'Wasserquellen',
    options: ['Regenwasser','Leitungswasser','Brunnen','Brunnen mit Pumpe','Handpumpe']
  },
  {
    key: 'power',
    title: 'Strom',
    options: ['Solar','Netz','Kein Strom']
  },
  {
    key: 'buildings',
    title: 'Gebäude / Dachfläche',
    options: ['Haus (Dach nutzbar)','Bungalow','Schuppen','Keine Dachfläche']
  },
  {
    key: 'area',
    title: 'Fläche (Schätzung)',
    options: ['Klein (≤100 m²)','Mittel (100–300 m²)','Groß (300–1000 m²)']
  },
  {
    key: 'existing',
    title: 'Was ist schon vorhanden?',
    options: ['Kompost','Hochbeet','Kräuterspirale','Obstbaum','Regentonne']
  },
  {
    key: 'budget',
    title: 'Budget (Richtwerte)',
    options: ['100 €','500 €','1000 €','2000 €']
  }
]

function Heading({children}:{children: React.ReactNode}){
  return <div className="heading">{children}</div>
}

function Bubble({label, onPick}:{label:string; onPick:()=>void}){
  const [popped, setPopped] = useState(false)
  const handle = ()=>{
    setPopped(true)
    setTimeout(()=> onPick(), 180) // wait for pop animation, then record & remove
  }
  return (
    <AnimatePresence>
      {!popped && (
        <motion.button
          className="bubble"
          onClick={handle}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          exit={{ scale: 0, opacity: 0, rotate: 15, transition: { duration: 0.18 } }}
        >
          {label}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function App(){
  const [answers, setAnswers] = useState<Record<string, CounterMap>>({})
  const [sectionIndex, setSectionIndex] = useState(0)

  const section = SECTIONS[sectionIndex]

  const counts = answers[section?.key] ?? {}

  const pick = (group: string, key: string)=>{
    setAnswers(prev => {
      const g = { ...(prev[group]||{}) }
      g[key] = (g[key]||0) + 1
      return { ...prev, [group]: g }
    })
  }

  const next = ()=> setSectionIndex(i => Math.min(i+1, SECTIONS.length-1))
  const prev = ()=> setSectionIndex(i => Math.max(i-1, 0))

  const done = sectionIndex === SECTIONS.length-1

  // Simple planner
  const plan = useMemo(()=>{
    const crops = answers['crops'] || {}
    const existing = answers['existing'] || {}
    const water = answers['water'] || {}
    const area = answers['area'] || {}
    const buildings = answers['buildings'] || {}
    const budget = answers['budget'] || {}

    let area_m2 = 80
    if(Object.keys(area).some(k=> k.includes('Groß'))) area_m2 = 600
    else if(Object.keys(area).some(k=> k.includes('Mittel'))) area_m2 = 200

    const weights: Record<string, number> = {Tomaten:0.8, Salat:0.3, Kräuter:0.2, Erdbeeren:0.5, Kartoffeln:1.2, Zucchini:0.8, Bohnen:0.4, Kürbis:1.0, Paprika:0.6, Apfelbaum:3}
    let score = 0
    for(const [k,n] of Object.entries(crops)){
      score += (weights[k] ?? 0.5) * n
    }
    const bedsNeeded = Math.max(1, Math.round(Math.min(area_m2/2, 2 + score*1.5)))
    const existingBeds = existing['Hochbeet'] || 0
    const bedsToAdd = Math.max(0, bedsNeeded - existingBeds)

    let baseWater = 40 * bedsNeeded
    if(crops['Tomaten']) baseWater += 30
    if(crops['Zucchini']) baseWater += 20
    if(crops['Apfelbaum']) baseWater += 50 * crops['Apfelbaum']

    const needsRain = ('Regenwasser' in water) || Object.keys(buildings).some(k=> k.includes('Dach'))
    const tankLiters = baseWater < 250 ? 1000 : 2000
    const tankSuggestion = needsRain ? `${tankLiters} L IBC-Tank` : 'Regentonne 300 L'

    const budgetStr = Object.keys(budget).join(' ')
    const budgetLevel = budgetStr.includes('2000') ? 'hoch' : budgetStr.includes('1000') ? 'mittel' : budgetStr.includes('500') ? 'basic' : 'mini'

    const purchases:string[] = []
    if(bedsToAdd>0){
      const pricePerBed = (budgetLevel==='hoch'||budgetLevel==='mittel') ? 70 : 35
      purchases.push(`${bedsToAdd} Hochbeet(e) (~${pricePerBed} € pro Stück)`)
    }
    if(needsRain){
      const priceTank = tankLiters===1000 ? 120 : 220
      purchases.push(`${tankSuggestion} (~${priceTank} €) + Fallrohrsammler`)
    }
    if(!existing['Kompost']){
      purchases.push('Komposter (~60 €)')
    }

    const steps = [
      'Standort wählen: sonnig, windgeschützt, Wasser in der Nähe',
      'Hochbeete bauen/stellen und mit Schichten füllen (Holz/Kompost/Erde)',
      'Bewässerung: Regentonne/IBC an Dach anschließen; bei Gefälle: Schwerkraftbewässerung',
      'Aussaat: März/April Salat & Kräuter, Mai Tomaten & Zucchini',
      'Mulchen, Kompost pflegen, regelmäßig ernten'
    ]

    return {bedsNeeded, bedsToAdd, baseWater, tankSuggestion, purchases, steps, area_m2}
  }, [answers])

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">🌱 Garden Bubbles</h1>
          <div className="text-sm opacity-70">Abschnitt {sectionIndex+1} / {SECTIONS.length}</div>
        </div>

        {/* Section Heading */}
        <Heading>{section.title}</Heading>
        <div className="mb-2 text-sm text-slate-600">Tipp: Auf dieselbe Blase mehrfach tippen = Anzahl erhöhen.</div>

        {/* Bubbles */}
        <div className="flex flex-wrap gap-3 py-4">
          {section.options.map(opt => (
            <Bubble key={opt} label={opt} onPick={()=> pick(section.key, opt)} />
          ))}
        </div>

        {/* Selection summary */}
        <div className="text-sm text-slate-700">
          {Object.entries(counts).length>0 ? (
            <div>Auswahl: {Object.entries(counts).map(([k,v])=> <span key={k} className="mr-4">{k} ×{v}</span>)}</div>
          ) : <div className="opacity-60">Noch nichts ausgewählt.</div>}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center gap-3">
          <button className="bubble" onClick={prev} disabled={sectionIndex===0}>Zurück</button>
          <button className="bubble" onClick={next} disabled={sectionIndex===SECTIONS.length-1}>Weiter</button>
        </div>

        {/* Result */}
        {sectionIndex === SECTIONS.length-1 && (
          <div className="mt-10 border rounded-2xl p-6 bg-bubble">
            <h2 className="text-xl font-bold mb-3">🧠 Plan (Entwurf)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><b>Benötigte Hochbeete:</b> {plan.bedsNeeded} (hinzufügen: {plan.bedsToAdd})</li>
              <li><b>Bewässerungsbedarf (Peak):</b> ~{plan.baseWater} L/Woche</li>
              <li><b>Wasserspeicher:</b> {plan.tankSuggestion}</li>
              <li><b>Eingeschätzte nutzbare Fläche:</b> ~{plan.area_m2} m²</li>
            </ul>
            {plan.purchases.length>0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Sinnvolle Anschaffungen</h3>
                <ul className="list-disc pl-5">
                  {plan.purchases.map((p,i)=>(<li key={i}>{p}</li>))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <h3 className="font-semibold">Nächste Schritte</h3>
              <ol className="list-decimal pl-5">
                {plan.steps.map((s,i)=>(<li key={i}>{s}</li>))}
              </ol>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
