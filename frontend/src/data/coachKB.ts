export interface KBEntry {
  keywords: string[]
  answer: string
  category?: string
  followUp?: string[]
}

export const knowledgeBase: KBEntry[] = [
  // ============ PROGRAMMES ============
  {
    keywords: ['push', 'pull', 'legs', 'ppl'],
    answer: "Le Push Pull Legs (PPL) est un programme qui sépare les mouvements par fonction biomécanique :\n\n• Push (pectoraux/épaules/triceps) : développé couché, développé militaire, dips\n• Pull (dos/biceps) : row, tirage, curl biceps\n• Legs (jambes) : squat, presse, fentes\n\nFréquence : 3 à 6 séances/semaine. Idéal pour un volume élevé avec récupération optimale. Chaque groupe musculaire est travaillé 1 à 2 fois par semaine selon le nombre de jours.",
    category: 'programme'
  },
  {
    keywords: ['upper', 'lower', 'haut', 'bas', 'split'],
    answer: "L'Upper/Lower Split divise le corps en deux :\n\nUpper (haut du corps) : développé, row, overhead press, curls\nLower (bas du corps) : squat, deadlift, fentes, mollets\n\nFréquence recommandée : 4 séances/semaine (2 upper, 2 lower planning alterné). Avantage : volume optimal par groupe musculaire (18-24 séries/groupe/semaine), récupération de 48h entre chaque session. Très efficace pour les intermédiaires.",
    category: 'programme'
  },
  {
    keywords: ['hilv', 'haute', 'intensité', 'faible', 'volume', 'high', 'intensity', 'low'],
    answer: "HILV (High Intensity Low Volume) : chaque série est poussée à haute intensité (RPE 9-10) avec peu de séries.\n\n• 3 séances/semaine en full body ou upper/lower\n• 8-12 séries total par groupe musculaire\n• Repos longs : 3-5 min entre séries lourdes\n• Idéal pour athlètes avancés, gagne-temps (séances de 45 min)\n\nAttention : la technique doit être parfaite vu l'intensité maximale.",
    category: 'programme'
  },
  {
    keywords: ['bro', 'split', 'bodybuilding', 'isolation'],
    answer: "Le Bro Split est LE split traditionnel de bodybuilding :\n\n• Lundi : Pectoraux\n• Mardi : Dos\n• Mercredi : Épaules\n• Jeudi : Jambes\n• Vendredi : Bras (biceps/triceps)\n• Samedi : Optionnel (abs/cardio)\n\n5-6 séances/semaine, volume d'isolation maximal par groupe. Parfait pour la musculation esthétique et le ciblage musculaire précis. Moins adapté à la force maximale ou au sport de performance.",
    category: 'programme'
  },
  {
    keywords: ['full', 'body', 'corps', 'complet', 'entier', 'fb'],
    answer: "Full Body = tout le corps à chaque séance. Les mouvements de base sont rois : squat, développé couché, row, overhead press, soulevé de terre.\n\n• 3 séances/semaine (lundi, mercredi, vendredi)\n• Temps sous tension élevé pour tout le corps\n• Fréquence 3x/semaine par muscle = excellente pour l'hypertrophie débutante\n\nIdéal pour : débutants, reprise après pause, perte de poids, manque de temps. Peut devenir limitant en volume pour les avancés.",
    category: 'programme'
  },
  {
    keywords: ['powerlifting', 'force', 'squat', 'bench', 'bench press', 'deadlift', 'soulevé', 'terre'],
    answer: "Le Powerlifting se concentre sur les 3 mouvements de compétition :\n\n1. Squat : 4×5 à 85-90% 1RM\n2. Bench Press : 4×5 à 85-90% 1RM\n3. Deadlift : 3×3 à 90% 1RM\n\n+ accessoires 3×8-12 pour l'équilibre musculaire\n• 4 séances/semaine, sessions de 2h\n• Progression linéaire ou ondulante\n• RPE cible : 8-9.5\n\nIdéal si votre objectif principal est la force maximale et les chiffres.",
    category: 'programme'
  },
  {
    keywords: ['hypertrophy', 'hypertrophie', 'masse', 'muscle', 'growth', 'croissance', 'gros'],
    answer: "Programme Hypertrophie : optimisé pour le développement musculaire.\n\nPlages de répétitions :\n• Exercices de base : 8-12 reps\n• Exercices d'isolation : 12-15 reps\n• Séries par groupe : 15-20/semaine\n• Repos : 60-90s\n\nPriorité : temps sous tension, congestion, connexion esprit-muscle. 4-5 séances/semaine. La progression se fait par double progression (reps d'abord, charge ensuite).",
    category: 'programme'
  },
  {
    keywords: ['strength', 'hypertrophie', 'mixte', 'force', 'combiné'],
    answer: "Strength & Hypertrophy combine le meilleur des deux mondes :\n\n• Exercices principaux : 4-6 reps (développement de la force)\n• Exercices d'isolation : 8-12 reps (hypertrophie ciblée)\n• 4 séances/semaine en upper/lower ou PPL\n\nIdéal pour les intermédiaires qui veulent devenir plus forts TOUT en gagnant du muscle. La séance commence par le lift lourd, puis le volume d'hypertrophie.",
    category: 'programme'
  },

  // ============ NIVEAU & OBJECTIFS ============
  {
    keywords: ['débutant', 'commencer', 'start', 'beginner', 'premier', 'first', 'new', 'nouveau', 'novice'],
    answer: "Bienvenue dans le monde de la musculation ! Voici mon plan pour débuter :\n\n1. Programme recommandé : Full Body 3x/semaine (lun/mer/ven)\n2. Exercices de base : squat, développé couché, row, overhead press\n3. 3×10-12 reps, charges légères pour maîtriser la technique\n4. Progression : ajoutez 2.5kg quand vous réussissez 3×12\n\nSemaine 1-2 : technique uniquement. Semaine 3-8 : début de la progression. Après 12 semaines, passez à Upper/Lower ou PPL. La clé : la régularité prime sur l'intensité.",
    category: 'debutant',
    followUp: ['Quels exercices pour débuter ?', 'Quelle fréquence pour un débutant ?']
  },
  {
    keywords: ['intermédiaire', 'medium', 'intermediate', 'progresser', 'after', 'après', 'debutant'],
    answer: "Un intermédiaire s'entraîne depuis 6-12 mois et commence à stagner sur les exercices de base. Voici ma stratégie :\n\n1. Passez à un Upper/Lower 4x/semaine ou PPL 5x/semaine\n2. Introduction de techniques avancées : dropset, rest-pause\n3. Périodisation : alternez 4 semaines volume + 2 semaines intensité\n4. Débloquez vos plateaux en variant les exercices\n\nSi vous stagnez au développé couché depuis 3 semaines, changez de variante (incliné, décliné, haltères) pendant 4 semaines.",
    category: 'niveau'
  },
  {
    keywords: ['avancé', 'advanced', 'expert', 'pro', 'élite'],
    answer: "Pour les athlètes avancés (3+ ans d'expérience) :\n\n• Périodisation obligatoire : macrocycles de 12-16 semaines\n• Techniques avancées : cluster sets, myo-reps, occlusion\n• Déload 1 semaine toutes les 4-6 semaines\n• Suivi méticuleux : RPE, volume, fréquence, récupération\n\nEnvisagez des cycles de spécialisation (4-6 semaines sur un groupe faible). L'innovation et la variation constante sont clés.",
    category: 'niveau'
  },

  // ============ NUTRITION ============
  {
    keywords: ['protéine', 'protein', 'whey', 'supplément', 'supplement', 'créatine', 'creatine'],
    answer: "Suppléments basés sur la science :\n\nESSENTIELS :\n• Whey protein : 25-30g post-workout, pratique pour atteindre ses besoins\n• Créatine monohydrate : 5g/jour, le supplément le plus étudié (force + volume)\n\nUTILES :\n• Magnésium : 200-400mg le soir (sommeil/récupération)\n• Vitamine D : 2000-4000 UI/jour (immunité/testostérone)\n• Oméga-3 : 2-3g/jour (inflammation)\n\nINUTILES (économie d'argent) :\nBCAA, testostérone boosters, brûleurs de graisse miracles",
    category: 'nutrition',
    followUp: ['Combien de protéines par jour ?', 'Quand prendre la whey ?']
  },
  {
    keywords: ['calories', 'calories', 'nutrition', 'manger', 'alimentation', 'régime', 'diet', 'repas', 'macro'],
    answer: "LES BASES DE LA NUTRITION SPORTIVE :\n\nCalcul des besoins journaliers (pour 80kg) :\n• Maintenance : ~2600 kcal\n• Prise de masse : ~2900-3100 kcal (surplus 300-500)\n• Perte de poids : ~2100-2300 kcal (déficit 300-500)\n\nMACRONUTRIMENTS :\n• Protéines : 1.6-2.2g/kg (128-176g pour 80kg)\n• Glucides : 4-6g/kg (320-480g) - prioritaires autour de l'entraînement\n• Lipides : 0.8-1g/kg (64-80g) - essentiels pour la testostérone\n\nRépartissez sur 3-4 repas avec 30-40g de protéines par repas.",
    category: 'nutrition'
  },
  {
    keywords: ['perte', 'poids', 'weight', 'loss', 'fat', 'graisse', 'maigrir', 'sèche', 'sèche'],
    answer: "STRATÉGIE DE PERTE DE POIDS :\n\n1. Déficit calorique modéré : 300-500 kcal sous votre maintenance\n2. Protéines HAUTES : 2-2.5g/kg pour préserver le muscle\n3. Musculation maintenue : 3-4 séances/semaine, charges lourdes\n4. Cardio complémentaire : 20-30 min LISS après séance, 2-3x HIIT/semaine\n5. Patience : 0.5-1% du poids de corps par semaine est idéal\n\nPiège à éviter : ne descendez pas sous 1500 kcal ni ne supprimez les glucides. Priorité : protéines d'abord, légumes, eau 2-3L.",
    category: 'nutrition',
    followUp: ['Combien de cardio par semaine ?', 'Quels aliments privilégier ?']
  },
  {
    keywords: ['prise', 'masse', 'mass', 'gain', 'volume', 'bulk', 'prendre'],
    answer: "LA PRISE DE MASSE EFFICACE :\n\nSurplus calorique : 300-500 kcal au-dessus de la maintenance\nExemple pour 80kg : 2900-3100 kcal/jour\n\nDistribution des macros :\n• P : 1.8-2.2g/kg (144-176g)\n• G : 5-6g/kg (400-480g)\n• L : 0.8-1g/kg (64-80g)\n\nProgramme recommandé : PPL 5-6x/semaine ou Bro Split\nGros exercices de base en priorité (squat, développé, row, deadlift)\nRepos 60-90s. Dormez 8h. Tenez 8-16 semaines de bulk.",
    category: 'nutrition'
  },

  // ============ RÉCUPÉRATION ============
  {
    keywords: ['repos', 'rest', 'récupération', 'recovery', 'dormir', 'sleep', 'sieste', 'fatigue'],
    answer: "RÉCUPÉRATION OPTIMALE :\n\nSOMMEIL : 7-9h par nuit, coucher régulier, pas d'écran 1h avant\n\nJOURS DE REPOS :\n• 1-2 jours/semaine COMPLETS sans entraînement\n• Mobilité ou stretching léger possible\n• Marche 30-60 min pour la circulation\n\nSIGNAUX DE SUR-ENTRAÎNEMENT :\n• Fatigue persistante malgré le sommeil\n• Baisse de performance sur 2+ séances consécutives\n• Irritabilité, manque de motivation\n• Douleurs articulaires inhabituelles\n\nSolution : une semaine de déload toutes les 4-6 semaines.",
    category: 'recuperation'
  },
  {
    keywords: ['délod', 'deload', 'déloud', 'pause', 'break', 'repos', 'semaine'],
    answer: "Le déloud (semaine de récupération) :\n\nQuand ? Toutes les 4 à 6 semaines d'entraînement intense.\n\nComment ?\n• Gardez les mêmes exercices\n• Réduisez les charges de 40-50%\n• Gardez le même nombre de séries/répétitions\n• OU réduisez le volume de 50%\n\nObjectif : laisser le système nerveux et les articulations récupérer tout en maintenant les schémas moteurs. Vous reviendrez PLUS FORT.",
    category: 'recuperation'
  },

  // ============ EXERCICES ============
  {
    keywords: ['squat', 'accroupi', 'jambes', 'cuisses'],
    answer: "LE SQUAT : exercice roi des jambes\n\nExécution :\n1. Barre sur les trapèzes, pieds largeur épaules\n2. Descendez en contrôlant, genoux dans l'axe des pieds\n3. Cuisses parallèles au sol minimum\n4. Remontez en expirant, genoux NE VERROUILLENT PAS\n\nSéries lourdes : 3-5×5, RPE 8-9\nHypertrophie : 3-4×8-12, RPE 7-8\n\nErreurs fréquentes : dos rond, genoux qui rentrent, talons qui décollent.",
    category: 'exercice'
  },
  {
    keywords: ['développé', 'couché', 'bench', 'bench press', 'pectoraux', 'pecs', 'poitrine'],
    answer: "LE DÉVELOPPÉ COUCHÉ :\n\nPosition :\n• Pieds à plat, fessiers serrés, dos légèrement arqué\n• Barre au niveau des mamelons en position basse\n• Descendez en contrôlant (2 sec), poussez explosivement\n\nForce : 3-5×5\nHypertrophie : 3-4×8-12\n\nVariantes : incliné (haut des pecs), décliné (bas des pecs), haltères (amplitude). Progression : ajoutez 2.5kg par semaine.",
    category: 'exercice'
  },
  {
    keywords: ['row', 'tirage', 'dos', 'back', 'pull-up', 'traction', 'tractions'],
    answer: "EXERCICES DOS :\n\nTractions (pull-ups) :\n• 3×8-12, amplitude complète\n• Variantes : prise large, supination, neutre\n• Alternative : tirage poulie haute (lat pulldown)\n\nRow (aviron) :\n• Row barre : 3-4×8-10, dos droit\n• Row haltère : 3-4×10-12 par bras\n• Tirage horizontal : 3×12-15\n\nLe dos a besoin de volume : 16-20 séries/semaine pour bien se développer.",
    category: 'exercice'
  },

  // ============ FRÉQUENCE & PROGRESSION ============
  {
    keywords: ['fréquence', 'frequency', 'combien', 'fois', 'semaine', 'session', 'jour', 'entraîner', 'training'],
    answer: "FRÉQUENCE RECOMMANDÉE PAR NIVEAU :\n\nDébutant (0-6 mois) : 3x/semaine (Full Body)\nIntermédiaire (6-18 mois) : 4x/semaine (Upper/Lower)\nAvancé (18 mois+) : 5-6x/semaine (PPL ou Bro Split)\n\nRÉPARTITION OPTIMALE :\n• Chaque muscle 2x/semaine pour l'hypertrophie\n• 48h entre deux séances du même groupe\n• Max 2 séances intenses consécutives avant un jour léger/repos\n\nÉcoutez votre corps : si vous êtes fatigué, prenez un jour de repos supplémentaire.",
    category: 'frequence'
  },
  {
    keywords: ['progression', 'overload', 'charge', 'poids', 'augmenter', 'progresser', 'devenir', 'fort', 'stagne', 'stagnation', 'plateau'],
    answer: "STRATÉGIES DE PROGRESSION :\n\n1. PROGRESSION LINÉAIRE :\nAjoutez 2.5-5kg quand vous atteignez le haut de la fourchette de reps\nExemple : 3×8 → 3×12 → ajouter 2.5kg → 3×8\n\n2. DOUBLE PROGRESSION :\nAugmentez d'abord les reps, puis la charge\n\n3. PÉRIODISATION :\n• 4-6 semaines volume (8-12 reps, 60-90s repos)\n• 2-3 semaines intensité (3-5 reps, 3-5min repos)\n\n4. DÉBLOQUER UN PLATEAU :\nChangez de variante d'exercice, augmentez la fréquence, ou prenez une semaine de déloud.",
    category: 'progression',
    followUp: ['Pourquoi je stagne ?', 'Quand augmenter les charges ?']
  },

  // ============ CARDIO & CONDITIONNEMENT ============
  {
    keywords: ['cardio', 'hiit', 'endurance', 'coeur', 'fitness', 'conditionnement'],
    answer: "CARDIO COMPLÉMENTAIRE :\n\nHIIT (High Intensity Interval Training) :\n• 15-20 min, ratio 30s effort / 30s repos\n• 2-3x/semaine en fin de séance de musculation\n• Brûle plus en moins de temps\n\nLISS (Low Intensity Steady State) :\n• 30-45 min, 120-140 bpm\n• Jours de repos ou après séance\n• Marche, vélo, elliptique\n\nRecommandation : 2x HIIT + 1-2x LISS par semaine. Trop de cardio peut nuire à la récupération et à la prise de masse.",
    category: 'cardio'
  },

  // ============ BLESSURES & PRÉVENTION ============
  {
    keywords: ['blessure', 'injury', 'pain', 'douleur', 'mal', 'tendinite', 'genou', 'dos', 'épaule', 'lombaire'],
    answer: "GESTION DES BLESSURES :\n\nIMMÉDIAT :\n1. Arrêtez l'exercice douloureux immédiatement\n2. Glace 15-20 min si inflammation\n3. Consultez un professionnel de santé (kiné, médecin du sport)\n4. Ne 'forcez pas à travers' la douleur\n\nPRÉVENTION :\n• Échauffement complet 10-15 min\n• Technique irréprochable avant d'ajouter du poids\n• Mobilité articulaire 2-3x/semaine\n• Progression progressive (pas plus de 5-10% d'augmentation/semaine)\n• Déloud régulier\n\nADAPTATION : si douleur au genou en squat → squat avant, presse, ou fentes.",
    category: 'blessure'
  },

  // ============ ÉQUIPEMENT ============
  {
    keywords: ['équipement', 'equipment', 'salle', 'gym', 'maison', 'home', 'barre', 'haltère', 'kettlebell', 'musculation'],
    answer: "MATÉRIEL RECOMMANDÉ :\n\nEN SALLE (indispensable) :\n• Barre olympique, poids libres\n• Banc réglable\n• Cage à squat ou racks\n• Poulies (cable tower)\n\nÀ LA MAISON (budget) :\n• Haltères réglables (200-400€)\n• Banc pliable (100-200€)\n• Barre de traction / anneaux (30-50€)\n• Bandes élastiques de résistance\n\nLe strict minimum pour un full body efficace à la maison : haltères réglables + banc + barre de traction.",
    category: 'equipement'
  },

  // ============ FEMMES ============
  {
    keywords: ['femme', 'woman', 'female', 'fitness', 'féminin', 'fille'],
    answer: "MUSCULATION AU FÉMININ :\n\nNon, vous ne 'deviendrez pas trop musclée' — la testostérone des femmes est ~15x plus basse que celle des hommes. La musculation vous donnera un corps tonique et ferme.\n\nPROGRAMMES ADAPTÉS :\n• Full Body 3x/semaine (débutante)\n• Upper/Lower 4x/semaine (intermédiaire)\n• Focus jambes/fessiers 2x/semaine si souhaité\n\nAVANTAGES :\n• Meilleure composition corporelle\n• Densité osseuse renforcée\n• Métabolisme de base augmenté\n• Confiance en soi\n\nNiveau calories : ajustez selon vos objectifs (prise/perte/maintien).",
    category: 'femme'
  },

  // ============ ÂGE ============
  {
    keywords: ['âge', 'age', 'old', 'vieux', 'senior', 'vétéran', '50', '60', 'ans', 'plus'],
    answer: "MUSCULATION APRÈS 50 ANS :\n\nLa préservation de la masse musculaire est CRUCIALE avec l'âge (sarcopénie).\n\nRECOMMANDATIONS :\n• Full Body 2-3x/semaine\n• Temps de repos plus longs : 2-3 min\n• Priorité à la technique et à la mobilité\n• Échauffement prolongé : 15-20 min\n• Charges modérées, pas de max\n• Travail d'équilibre et stabilité\n\nBÉNÉFICES :\n• Maintien de la masse musculaire et osseuse\n• Amélioration de la mobilité et de l'équilibre\n• Meilleure santé cardiovasculaire\n• Qualité de vie améliorée",
    category: 'age'
  },

  // ============ ABDOS & CORE ============
  {
    keywords: ['abdos', 'abdominaux', 'abs', 'core', 'sangle', 'ventre', 'six-pack', 'plank', 'gainage'],
    answer: "LES ABDOS :\n\nIls se travaillent comme n'importe quel muscle :\n• Fréquence : 2-3x/semaine\n• Séries : 3-4\n• Répétitions : 15-20\n\nEXERCICES EFFICACES :\n1. Crunch (poulie ou au sol) : 3×15-20\n2. Leg raise : 3×12-15\n3. Plank : 3×45-90s\n4. Cable crunch : 3×15-20\n5. Russian twist : 3×20\n\nLe SIX-PACK dépend à 80% de la nutrition. Taux de masse grasse nécessaire : <12% hommes, <20% femmes. On ne peut pas spot-réduire la graisse du ventre.",
    category: 'abdos'
  },

  // ============ ÉCHAUFFEMENT ============
  {
    keywords: ['échauffement', 'warm', 'up', 'chauffer', 'préparation', 'mobilité', 'stretch', 'étirement'],
    answer: "L'ÉCHAUFFEMENT IDÉAL :\n\n1. Cardio léger (5 min) : vélo, rameur, corde à sauter\n2. Mobilité articulaire (5 min) : cercles bras, balancements jambes, rotations tronc\n3. Séries d'approche par exercice :\n   • 1ère série : barre vide ×10\n   • 2ème série : 50% charge ×5\n   • 3ème série : 70% charge ×3\n   • Puis charge de travail\n\nÉtirements statiques UNIQUEMENT en fin de séance. Avant, préférez les étirements dynamiques.",
    category: 'echauffement'
  },

  // ============ RPE / INTENSITÉ ============
  {
    keywords: ['rpe', 'failure', 'échec', 'intensité', 'effort', 'difficulté', 'rir', 'réserve', 'reps'],
    answer: "LE RPE (Rate of Perceived Exertion) :\n\nÉchelle de 1 à 10 :\n• 10 = échec total, impossible de faire une rep de plus\n• 9 = 1 répétition de réserve (RIR 1)\n• 8 = 2 RIR (vous pouviez en faire 2 de plus)\n• 7 = 3 RIR (confortable, difficile)\n• 5-6 = modéré, technique\n\nRECOMMANDATIONS :\n• Force (1-5 reps) : RPE 8-9.5\n• Hypertrophie (8-15 reps) : RPE 7-9\n• Endurance (15+ reps) : RPE 5-7\n\nNE FAITES PAS chaque série à l'échec. Réservez RPE 10 pour la dernière série du dernier exercice.",
    category: 'intensite'
  },

  // ============ SÉANCE TYPE ============
  {
    keywords: ['séance', 'type', 'typical', 'structure', 'ordre', 'ordre', 'routine'],
    answer: "STRUCTURE D'UNE SÉANCE EFFICACE :\n\n1. Échauffement (10-15 min)\n2. Exercice principal composé (4-5 séries, lourd) — squat, développé, deadlift\n3. Exercice secondaire composé (3-4 séries) — row, overhead press, fentes\n4. Exercices d'isolation (3×12-15) — curls, extensions, mollets\n5. Abdo / gainage (5-10 min)\n6. Étirements statiques (5-10 min)\n\nDurée totale idéale : 60-90 min. Pas besoin de plus.",
    category: 'seance'
  },

  // ============ QUESTIONS GÉNÉRALES SUPPLÉMENTAIRES ============
  {
    keywords: ['eau', 'hydratation', 'drink', 'water', 'boire'],
    answer: "HYDRATATION :\n\n• 2-3L d'eau par jour minimum\n• Pendant l'entraînement : 500ml-1L par heure\n• Avant : 500ml 2h avant la séance\n• Après : 500ml pour chaque 500g perdus pendant la séance\n\nConseil : buvez par petites gorgées régulièrement. L'urine doit être jaune pâle. La déshydratation de 2% réduit les performances de 10-15%.",
    category: 'nutrition'
  },
  {
    keywords: ['testostérone', 'testosterone', 'hormone', 'naturel', 'booster'],
    answer: "COMMENT OPTIMISER LA TESTOSTÉRONE NATURELLEMENT :\n\n1. Sommeil : 7-9h, coucher avant minuit\n2. Nutrition : bonnes graisses (avocat, olive, noix, poisson gras), zinc, magnésium, vitamine D\n3. Entraînement : gros exercices de base (squat, deadlift) avec charges lourdes\n4. Pas de stress chronique : cortisol tue la testostérone\n5. Taux de masse grasse sain : ni trop bas, ni trop haut\n6. Exposition au soleil : 15-20 min/jour (vitamine D)\n\nÉvitez : alcool excessif, manque de sommeil, régimes trop bas en calories, perturbateurs endocriniens (plastiques).",
    category: 'hormone'
  },
  {
    keywords: ['alcool', 'alcohol', 'bière', 'beer', 'vin', 'soirée', 'fête'],
    answer: "ALCOOL ET MUSCULATION :\n\nL'alcool impacte négativement :\n• Synthèse protéique musculaire : réduite de 30% pendant 24h après consommation\n• Sommeil : qualité dégradée\n• Testostérone : temporairement réduite\n• Hydratation : déshydratation\n\nSi vous consommez :\n• Limitez à 1-2 verres, pas plus de 1x/semaine\n• Buvez beaucoup d'eau entre les verres\n• Mangez des protéines avant\n• Évitez l'alcool dans les 24h suivant une séance importante\n\nUn excès régulier ruine vos progrès.",
    category: 'nutrition'
  },
]

export function findAnswer(query: string): { answer: string; score: number; entry: KBEntry | null } {
  const words = query.toLowerCase().split(/[\s,?'"]+/).filter(w => w.length > 1)
  let best: { answer: string; score: number; entry: KBEntry | null } = { answer: '', score: 0, entry: null }

  for (const entry of knowledgeBase) {
    let score = 0
    const q = query.toLowerCase()

    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        score += kw.length > 4 ? 5 : kw.length > 2 ? 3 : 1
      }
      for (const w of words) {
        if (kw.includes(w) || w.includes(kw)) {
          score += w.length > 4 ? 3 : 1
          if (kw === w) score += 2
        }
      }
    }

    if (score > best.score) {
      best = { answer: entry.answer, score, entry }
    }
  }

  return best
}

export function generateFallback(query: string): string {
  const q = query.toLowerCase()
  if (q.includes('bonjour') || q.includes('salut') || q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return "Bonjour ! Je suis votre coach IA IronTrack. Je peux répondre à toutes vos questions sur le fitness : programmes d'entraînement, nutrition, récupération, exercices, suppléments, perte de poids, prise de masse, et bien plus. Que voulez-vous savoir ?"
  if (q.includes('merci') || q.includes('thanks') || q.includes('thank') || q.includes('cool') || q.includes('super'))
    return "Avec plaisir ! N'hésitez pas à me poser d'autres questions quand vous voulez. Je suis là 24/7 pour vous accompagner dans votre progression fitness. Vous pouvez me demander des détails sur n'importe quel programme ou conseil."
  if (q.includes('comment') || q.includes('how') || q.includes('quoi') || q.includes('what'))
    return "Pouvez-vous être plus précis ? Voici quelques sujets sur lesquels je peux vous aider :\n\n• Quel programme choisir (PPL, Full Body, Upper/Lower...)\n• Nutrition et suppléments\n• Perte de poids ou prise de masse\n• Technique d'exercices\n• Récupération et blessures\n• Fréquence et progression\n\nPosez-moi une question concrète !"
  if (q.includes('qui') || q.includes('who') || q.includes('présente') || q.includes('c\'est'))
    return "Je suis un coach IA spécialisé en fitness et musculation, développé par IronTrack. Ma mission est de vous guider dans votre entraînement avec des conseils précis et personnalisés. Je connais tous les programmes, la nutrition, la récupération, et tout ce qui touche au sport."
  if (q.includes('quoi') || q.includes('rien') || q.includes('rien'))
    return "Pas d'inspiration ? Essayez une de ces questions :\n\n\"Quel programme pour débuter ?\"\n\"Comment prendre de la masse ?\"\n\"C'est quoi le PPL ?\"\n\"Conseils nutrition\"\n\"Quelle fréquence d'entraînement ?\""
  return "Je n'ai pas de réponse spécifique à cette question. Essayez de reformuler ou posez-moi une question sur :\n\n• Un programme spécifique (PPL, Full Body, Upper/Lower...)\n• La nutrition (protéines, calories, suppléments)\n• La récupération (sommeil, déloud, blessures)\n• Un exercice (squat, développé, row, tractions)\n• La progression et les plateaux"
}
