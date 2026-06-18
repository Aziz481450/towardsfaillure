export interface ProgramExercise {
  name: string
  sets?: string
  reps?: string
  rest?: string
  notes?: string
}

export interface ProgramDay {
  name: string
  muscles: string[]
  exercises: ProgramExercise[]
}

export interface ProgramWeek {
  name: string
  days: ProgramDay[]
}

export interface Program {
  id: string
  name: string
  description: string
  goal: string
  level: string
  frequency: string
  duration: string
  estCalories: string
  image: string
  color: string
  gradient: string
  benefits: string[]
  icon: string
  weeks: ProgramWeek[]
}

export const programs: Program[] = [
  {
    id: 'ppl',
    name: 'Push Pull Legs',
    description: 'Programme très populaire séparant les mouvements selon leur fonction biomécanique. Push (pectoraux/épaules/triceps), Pull (dos/biceps), Legs (jambes).',
    goal: 'Prise de masse · Force · Esthétique',
    level: 'Intermédiaire',
    frequency: '3–6 séances/semaine',
    duration: '8–12 semaines',
    estCalories: '450–600 kcal/séance',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626, #991B1B)',
    benefits: ['Volume hebdomadaire élevé', 'Récupération optimale', 'Flexible en fréquence', 'Progression linéaire'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Push A',
            muscles: ['Pectoraux', 'Épaules', 'Triceps'],
            exercises: [
              { name: 'Développé couché', sets: '4×8', reps: '8–10', rest: '90s' },
              { name: 'Développé incliné haltères', sets: '3×10', reps: '10–12', rest: '75s' },
              { name: 'Élévations latérales', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Dips', sets: '3×10', reps: '10', rest: '75s' },
              { name: 'Extensions triceps poulie', sets: '3×12', reps: '12–15', rest: '60s' },
            ],
          },
          {
            name: 'Pull A',
            muscles: ['Dos', 'Trapèzes', 'Biceps'],
            exercises: [
              { name: 'Tractions supination', sets: '4×8', reps: '8', rest: '90s' },
              { name: 'Rowing barre', sets: '4×10', reps: '10', rest: '90s' },
              { name: 'Tirage horizontal', sets: '3×12', reps: '12', rest: '75s' },
              { name: 'Curl barre EZ', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Oiseau inversé', sets: '3×15', reps: '15', rest: '60s' },
            ],
          },
          {
            name: 'Legs A',
            muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Mollets'],
            exercises: [
              { name: 'Squat barre', sets: '4×8', reps: '8–10', rest: '120s' },
              { name: 'Presse à cuisses', sets: '3×12', reps: '12', rest: '90s' },
              { name: 'Soulevé de terre roumain', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Leg curl allongé', sets: '3×12', reps: '12–15', rest: '60s' },
              { name: 'Mollets debout', sets: '4×15', reps: '15', rest: '45s' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'upper-lower',
    name: 'Upper / Lower Split',
    description: 'Le corps divisé en deux parties : Upper (haut du corps) et Lower (bas du corps). Chaque groupe travaillé deux fois par semaine pour un volume optimal.',
    goal: 'Hypertrophie · Force · Récompensation',
    level: 'Débutant à avancé',
    frequency: '4 séances/semaine',
    duration: '8–16 semaines',
    estCalories: '400–550 kcal/séance',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
    benefits: ['Fréquence 2x/groupe', 'Récupération excellente', 'Idéal pour les horaires chargés', 'Progressif'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Upper A',
            muscles: ['Pectoraux', 'Épaules', 'Dos', 'Bras'],
            exercises: [
              { name: 'Développé couché', sets: '4×8', reps: '8–10', rest: '90s' },
              { name: 'Développé militaire', sets: '3×10', reps: '10', rest: '75s' },
              { name: 'Tractions', sets: '4×8', reps: '8', rest: '90s' },
              { name: 'Rowing barre', sets: '3×10', reps: '10', rest: '75s' },
              { name: 'Curl biceps', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Extension triceps', sets: '3×12', reps: '12', rest: '60s' },
            ],
          },
          {
            name: 'Lower A',
            muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Mollets'],
            exercises: [
              { name: 'Squat', sets: '4×8', reps: '8–10', rest: '120s' },
              { name: 'Presse à cuisses', sets: '3×12', reps: '12', rest: '90s' },
              { name: 'Soulevé de terre roumain', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Leg curl', sets: '3×12', reps: '12–15', rest: '60s' },
              { name: 'Mollets assis', sets: '4×15', reps: '15', rest: '45s' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hilv',
    name: 'HILV',
    description: 'High Intensity Low Volume — intensité maximale avec peu de séries. Chaque série est poussée proche de l\'échec musculaire pour un stimulus maximal en temps minimal.',
    goal: 'Force · Prise de masse · Gain de temps',
    level: 'Intermédiaire à avancé',
    frequency: '3–4 séances/semaine',
    duration: '6–10 semaines',
    estCalories: '350–500 kcal/séance',
    image: 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?w=600&q=80',
    color: '#EA580C',
    gradient: 'linear-gradient(135deg, #EA580C, #C2410C)',
    benefits: ['Séances courtes (~40min)', 'Intensité maximale', 'Peu de volume articulaire', 'Progression rapide'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Push',
            muscles: ['Pectoraux', 'Épaules', 'Triceps'],
            exercises: [
              { name: 'Développé couché', sets: '3×5', reps: '5', rest: '120s', notes: 'RPE 9' },
              { name: 'Développé incliné', sets: '3×6', reps: '6', rest: '120s', notes: 'RPE 9' },
              { name: 'Dips lestés', sets: '3×6', reps: '6', rest: '90s', notes: 'RPE 8.5' },
            ],
          },
          {
            name: 'Pull',
            muscles: ['Dos', 'Trapèzes', 'Biceps'],
            exercises: [
              { name: 'Tractions lestées', sets: '3×5', reps: '5', rest: '120s', notes: 'RPE 9' },
              { name: 'Rowing barre', sets: '3×6', reps: '6', rest: '120s', notes: 'RPE 9' },
              { name: 'Curl barre lourd', sets: '3×8', reps: '8', rest: '90s', notes: 'RPE 8.5' },
            ],
          },
          {
            name: 'Legs',
            muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers'],
            exercises: [
              { name: 'Squat barre', sets: '3×5', reps: '5', rest: '150s', notes: 'RPE 9.5' },
              { name: 'Soulevé de terre roumain', sets: '3×6', reps: '6', rest: '120s', notes: 'RPE 9' },
              { name: 'Presse à cuisses', sets: '3×8', reps: '8', rest: '120s', notes: 'RPE 9' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'bro-split',
    name: 'Bro Split',
    description: 'Programme traditionnel des bodybuilders professionnels. Chaque groupe musculaire possède sa propre journée pour un ciblage maximal et un volume d\'isolation élevé.',
    goal: 'Hypertrophie maximale · Détail · Esthétique',
    level: 'Avancé',
    frequency: '5–6 séances/semaine',
    duration: '10–16 semaines',
    estCalories: '500–700 kcal/séance',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
    benefits: ['Volume maximal par groupe', 'Ciblage précis', 'Récupération longue', 'Esthétique pro'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Pectoraux',
            muscles: ['Pectoraux'],
            exercises: [
              { name: 'Développé couché', sets: '4×10', reps: '10', rest: '90s' },
              { name: 'Développé incliné haltères', sets: '4×10', reps: '10', rest: '75s' },
              { name: 'Écartés haltères', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Pec deck', sets: '3×15', reps: '15', rest: '60s' },
            ],
          },
          {
            name: 'Dos',
            muscles: ['Dos', 'Trapèzes'],
            exercises: [
              { name: 'Tractions', sets: '4×10', reps: '10', rest: '90s' },
              { name: 'Rowing barre', sets: '4×10', reps: '10', rest: '90s' },
              { name: 'Tirage vertical', sets: '3×12', reps: '12', rest: '75s' },
              { name: 'Rowing haltère un bras', sets: '3×12', reps: '12', rest: '75s' },
            ],
          },
          {
            name: 'Épaules',
            muscles: ['Épaules', 'Trapèzes'],
            exercises: [
              { name: 'Développé militaire', sets: '4×10', reps: '10', rest: '90s' },
              { name: 'Élévations latérales', sets: '4×15', reps: '15', rest: '60s' },
              { name: 'Oiseau', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Shrugs barre', sets: '3×12', reps: '12', rest: '60s' },
            ],
          },
          {
            name: 'Bras',
            muscles: ['Biceps', 'Triceps'],
            exercises: [
              { name: 'Curl barre EZ', sets: '4×10', reps: '10', rest: '75s' },
              { name: 'Curl marteau', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Barre front', sets: '4×10', reps: '10', rest: '75s' },
              { name: 'Pushdown poulie', sets: '3×12', reps: '12', rest: '60s' },
            ],
          },
          {
            name: 'Jambes',
            muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Mollets'],
            exercises: [
              { name: 'Squat', sets: '4×10', reps: '10', rest: '120s' },
              { name: 'Presse à cuisses', sets: '4×12', reps: '12', rest: '90s' },
              { name: 'Leg extension', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Leg curl', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Mollets debout', sets: '5×15', reps: '15', rest: '45s' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: 'Tout le corps est travaillé durant chaque séance. Idéal pour les débutants, la perte de poids et la condition physique générale.',
    goal: 'Conditionnement · Perte de poids · Débutants',
    level: 'Débutant',
    frequency: '3 séances/semaine',
    duration: '6–12 semaines',
    estCalories: '400–550 kcal/séance',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    color: '#16A34A',
    gradient: 'linear-gradient(135deg, #16A34A, #15803D)',
    benefits: ['Fréquence 3x corps complet', 'Simple à suivre', 'Brûle beaucoup de calories', 'Fondation solide'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Full Body A',
            muscles: ['Corps complet'],
            exercises: [
              { name: 'Squat', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Développé couché', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Tractions assistées', sets: '3×10', reps: '10', rest: '75s' },
              { name: 'Développé militaire haltères', sets: '3×10', reps: '10', rest: '75s' },
              { name: 'Soulevé de terre', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Gainage', sets: '3×45s', reps: '45s', rest: '45s' },
            ],
          },
          {
            name: 'Full Body B',
            muscles: ['Corps complet'],
            exercises: [
              { name: 'Presse à cuisses', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Développé incliné haltères', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Rowing barre', sets: '3×10', reps: '10', rest: '75s' },
              { name: 'Élévations latérales', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Leg curl', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Planche latérale', sets: '3×30s', reps: '30s', rest: '30s' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'powerlifting',
    name: 'Powerlifting',
    description: 'Programme orienté performance sur les trois mouvements de compétition : Squat, Bench Press, Deadlift. Avec exercices assistants pour renforcer les points faibles.',
    goal: 'Force maximale',
    level: 'Intermédiaire à avancé',
    frequency: '3–5 séances/semaine',
    duration: '12–16 semaines',
    estCalories: '500–650 kcal/séance',
    image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&q=80',
    color: '#1E293B',
    gradient: 'linear-gradient(135deg, #334155, #0F172A)',
    benefits: ['Force maximale pure', 'Technique compétition', 'Assistants ciblés', 'Peak programmé'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Squat Focus',
            muscles: ['Quadriceps', 'Fessiers', 'Core'],
            exercises: [
              { name: 'Squat barre', sets: '5×5', reps: '5', rest: '180s', notes: '85% 1RM' },
              { name: 'Front squat', sets: '3×8', reps: '8', rest: '120s' },
              { name: 'Leg curl', sets: '3×10', reps: '10', rest: '60s' },
              { name: 'Gainage', sets: '3×60s', reps: '60s', rest: '60s' },
            ],
          },
          {
            name: 'Bench Focus',
            muscles: ['Pectoraux', 'Triceps', 'Épaules'],
            exercises: [
              { name: 'Bench press', sets: '5×5', reps: '5', rest: '180s', notes: '85% 1RM' },
              { name: 'Pause bench', sets: '3×5', reps: '5', rest: '120s', notes: 'Pause 2s' },
              { name: 'Rowing barre', sets: '4×8', reps: '8', rest: '90s' },
              { name: 'Extensions triceps', sets: '3×10', reps: '10', rest: '60s' },
            ],
          },
          {
            name: 'Deadlift Focus',
            muscles: ['Dos', 'Jambes', 'Chaîne postérieure'],
            exercises: [
              { name: 'Deadlift', sets: '5×5', reps: '5', rest: '180s', notes: '85% 1RM' },
              { name: 'Romanian deadlift', sets: '3×8', reps: '8', rest: '120s' },
              { name: 'Tractions', sets: '3×10', reps: '10', rest: '75s' },
              { name: 'Hyperextensions', sets: '3×12', reps: '12', rest: '60s' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hypertrophy',
    name: 'Bodybuilding Hypertrophy',
    description: 'Programme optimisé pour la croissance musculaire. Volume modéré à élevé, répétitions 8–15, repos 60–90s pour un stress métabolique maximal.',
    goal: 'Volume musculaire · Symétrie',
    level: 'Intermédiaire',
    frequency: '4–5 séances/semaine',
    duration: '8–14 semaines',
    estCalories: '450–600 kcal/séance',
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=600&q=80',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    benefits: ['Stretch médiation', 'Tension mécanique', 'Stress métabolique', 'Pump musculaire'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Pectoraux & Triceps',
            muscles: ['Pectoraux', 'Triceps'],
            exercises: [
              { name: 'Développé couché haltères', sets: '4×10', reps: '10–12', rest: '75s' },
              { name: 'Développé incliné', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Écartés poulie vis-à-vis', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Pushdown câble', sets: '4×12', reps: '12–15', rest: '45s' },
              { name: 'Barre front', sets: '3×15', reps: '15', rest: '45s' },
            ],
          },
          {
            name: 'Dos & Biceps',
            muscles: ['Dos', 'Biceps'],
            exercises: [
              { name: 'Tractions prise large', sets: '4×10', reps: '10', rest: '75s' },
              { name: 'Rowing haltère', sets: '3×12', reps: '12/bras', rest: '60s' },
              { name: 'Tirage vertical prise serrée', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Curl incliné haltères', sets: '4×12', reps: '12', rest: '45s' },
              { name: 'Curl marteau', sets: '3×15', reps: '15', rest: '45s' },
            ],
          },
          {
            name: 'Jambes & Épaules',
            muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Épaules'],
            exercises: [
              { name: 'Squat', sets: '4×10', reps: '10', rest: '90s' },
              { name: 'Leg extension', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Leg curl', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Développé militaire assis', sets: '4×10', reps: '10', rest: '75s' },
              { name: 'Élévations latérales', sets: '3×15', reps: '15', rest: '45s' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'strength-hypertrophy',
    name: 'Strength & Hypertrophy',
    description: 'Combinaison parfaite de force et prise de masse. Exercices principaux en 4–6 reps pour la force, isolation en 8–12 reps pour l\'hypertrophie.',
    goal: 'Force + Volume musculaire',
    level: 'Intermédiaire',
    frequency: '4 séances/semaine',
    duration: '10–14 semaines',
    estCalories: '500–650 kcal/séance',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    benefits: ['Force + hypertrophie', 'Développement complet', 'Variété de rep ranges', 'Adapté à tous'],
    icon: '',
    weeks: [
      {
        name: 'Semaine 1–4',
        days: [
          {
            name: 'Upper Force',
            muscles: ['Pectoraux', 'Épaules', 'Dos'],
            exercises: [
              { name: 'Développé couché', sets: '5×5', reps: '5', rest: '120s' },
              { name: 'Rowing barre', sets: '5×5', reps: '5', rest: '120s' },
              { name: 'Développé militaire', sets: '4×6', reps: '6', rest: '120s' },
              { name: 'Tractions', sets: '3×8', reps: '8', rest: '90s' },
              { name: 'Curl barre', sets: '3×10', reps: '10', rest: '60s' },
              { name: 'Pushdown', sets: '3×10', reps: '10', rest: '60s' },
            ],
          },
          {
            name: 'Lower Force',
            muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers'],
            exercises: [
              { name: 'Squat', sets: '5×5', reps: '5', rest: '150s' },
              { name: 'Soulevé de terre roumain', sets: '4×6', reps: '6', rest: '120s' },
              { name: 'Presse à cuisses', sets: '3×10', reps: '10', rest: '90s' },
              { name: 'Leg curl', sets: '3×10', reps: '10', rest: '60s' },
              { name: 'Mollets debout', sets: '4×12', reps: '12', rest: '45s' },
            ],
          },
          {
            name: 'Upper Hypertrophy',
            muscles: ['Pectoraux', 'Épaules', 'Dos', 'Bras'],
            exercises: [
              { name: 'Développé incliné haltères', sets: '4×10', reps: '10', rest: '75s' },
              { name: 'Tirage horizontal', sets: '4×10', reps: '10', rest: '75s' },
              { name: 'Élévations latérales', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Curl marteau', sets: '3×12', reps: '12', rest: '60s' },
              { name: 'Barre front', sets: '3×12', reps: '12', rest: '60s' },
            ],
          },
          {
            name: 'Lower Hypertrophy',
            muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Mollets'],
            exercises: [
              { name: 'Leg press', sets: '4×12', reps: '12', rest: '90s' },
              { name: 'Fentes', sets: '3×12', reps: '12/leg', rest: '75s' },
              { name: 'Leg curl assis', sets: '3×15', reps: '15', rest: '60s' },
              { name: 'Leg extension unilatéral', sets: '3×12', reps: '12/leg', rest: '60s' },
              { name: 'Mollets presse', sets: '5×15', reps: '15', rest: '45s' },
            ],
          },
        ],
      },
    ],
  },
]
