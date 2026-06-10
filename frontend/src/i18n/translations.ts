export type Lang = 'en' | 'fr' | 'ar' | 'es' | 'de'

export const LANGUAGES: { code: Lang; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'de', label: 'Deutsch', dir: 'ltr' },
]

type DeepRecord = { [key: string]: string | DeepRecord }

const en: DeepRecord = {
  nav: { home: 'Home', features: 'Features', dashboard: 'Dashboard', programs: 'Coach IA', workout: 'Workout', stats: 'Stats', profile: 'Profile', signIn: 'Sign In', getStarted: 'Get Started', signOut: 'Sign Out' },
  hero: { welcomeBack: 'Welcome back', startWorkout: 'Start Workout', totalVolume: 'Total Volume', workouts: 'Workouts', hours: 'Hours', prs: 'PRs' },
  dash: { programs: 'Programs', history: 'History', featured: 'Featured Program', startProgram: 'Start Program', noWorkouts: 'No workouts yet', noWorkoutsDesc: 'Complete your first session to unlock your stats', startFirst: 'Start First Workout', kg: 'kg' },
  program: { goal: 'Goal', level: 'Level', frequency: 'Frequency', duration: 'Duration', description: 'Description', benefits: 'Benefits', exercises: 'exercises', sets: 'sets', reps: 'reps', rest: 'rest' },
  workout: { chooseProgram: 'Choose your program', startSession: 'Start Session', finish: 'Finish', completeWorkout: 'Complete Workout', addSet: 'Add Set', notes: 'Notes on this session', set: 'SET', kg: 'KG', reps: 'REPS', rpe: 'RPE', duration: 'Duration', success: 'Success', complete: 'Workout Complete', backToDash: 'Back to Dashboard', newWorkout: 'New Workout' },
  stats: { yourPerformance: 'Your Performance', statistics: 'Statistics', totalVolume: 'Total Volume', sessions: 'Sessions', dayStreak: 'Day Streak', avgVolume: 'Avg Volume', thisWeek: 'This Week', bestSession: 'Best Session', weeklyVolume: 'Weekly Volume', muscleDistribution: 'Muscle Distribution', recentSessions: 'Recent Sessions', noData: 'No data yet — start training', noSessions: 'No sessions recorded yet' },
  auth: { welcomeBack: 'Welcome back', signInToContinue: 'Sign in to continue your journey', noAccount: "No account?", createOne: 'Create one', email: 'Email', password: 'Password', signingIn: 'Signing in...', signIn: 'Sign In', invalidCredentials: 'Invalid email or password', createAccount: 'Create account', beginJourney: 'Begin your fitness journey', username: 'Username', fullName: 'Full Name', creatingAccount: 'Creating account...', alreadyHaveAccount: 'Already have an account?', registrationFailed: 'Registration failed', profile: 'Profile', notSet: 'Not set' },
  landing: { nextLevel: 'Next Level Training Platform', heroTitle: 'IRON', heroTitleAccent: 'TRACK', heroDesc: 'Track every rep. Crush every set. Break every limit.', heroDesc2: 'The most advanced bodybuilding platform on the planet.', startFree: 'Start Free Trial', builtFor: 'Built for', ironMindsets: 'iron mindsets', dominate: 'Everything you need to dominate your training', quote: '"You are not in competition with anyone else. Your only competition is yourself — your past, your limits, your excuses."', quoteAuthor: '— David Goggins', readyToTransform: 'Ready to', transform: 'transform', joinThousands: 'Join thousands of athletes already tracking their journey.' },
  features: { programBuilder: 'Program Builder', programBuilderDesc: 'Design custom training programs with weeks, days, and exercises. Clone and adapt any template in seconds.', liveLogger: 'Live Logger', liveLoggerDesc: 'Log every set, rep, and weight in real-time with auto-save. Smart PR detection powered by the Epley formula.', analytics: 'Analytics', analyticsDesc: 'Comprehensive stats on volume trends, frequency, streaks, and plateaus. Export your data as CSV or PDF.', prDetection: 'PR Detection', prDetectionDesc: 'Automatic 1RM and volume PR alerts. Get celebrated every time you smash your personal record.' },
  programsList: {
    ppl: 'Push Pull Legs', pplDesc: 'Program splitting movements by biomechanical function. Push (chest/shoulders/triceps), Pull (back/biceps), Legs (lower body).',
    upperLower: 'Upper / Lower Split', upperLowerDesc: 'Upper body and lower body trained twice per week for optimal volume and recovery.',
    hilv: 'HILV', hilvDesc: 'High Intensity Low Volume — maximum intensity with minimal sets. Every set taken close to failure.',
    broSplit: 'Bro Split', broSplitDesc: 'Traditional bodybuilding split. Each muscle group gets its own day for maximum isolation volume.',
    fullBody: 'Full Body', fullBodyDesc: 'Full body trained every session. Ideal for beginners, fat loss, and general conditioning.',
    powerlifting: 'Powerlifting', powerliftingDesc: 'Performance-focused program on the three competition lifts: Squat, Bench Press, Deadlift.',
    hypertrophy: 'Bodybuilding Hypertrophy', hypertrophyDesc: 'Optimized for muscle growth. Moderate to high volume, 8–15 reps, 60–90s rest.',
    strengthHypertrophy: 'Strength & Hypertrophy', strengthHypertrophyDesc: 'Perfect combination of strength and mass. Main lifts 4–6 reps, isolation 8–12 reps.',
    massGain: 'Mass Gain', massGainDesc: 'High-calorie bulking program for maximum muscle gain. Focus on compound lifts with progressive overload.',
    strength: 'Strength', strengthDesc: 'Pure strength program focused on neural adaptation and maximal force production at low reps.',
    aesthetic: 'Aesthetic', aestheticDesc: 'Balanced physique program combining moderate volume with strategic posing and symmetry work.',
    beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
    beginnerToAdvanced: 'Beginner to Advanced',
    intermediateToAdvanced: 'Intermediate to Advanced',
    sessionsPerWeek: 'sessions/week',
  },
  time: { minutes: 'min', hours: 'h', days: 'days' },
  footer: { allRights: 'All rights reserved.' },
}

const fr: DeepRecord = {
  nav: { home: 'Accueil', features: 'Fonctionnalités', dashboard: 'Tableau de bord', programs: 'Coach IA', workout: 'Entraînement', stats: 'Statistiques', profile: 'Profil', signIn: 'Connexion', getStarted: 'Commencer', signOut: 'Déconnexion' },
  hero: { welcomeBack: 'Bon retour', startWorkout: 'Commencer', totalVolume: 'Volume total', workouts: 'Séances', hours: 'Heures', prs: 'Records' },
  dash: { programs: 'Programmes', history: 'Historique', featured: 'Programme à la une', startProgram: 'Démarrer', noWorkouts: 'Aucune séance', noWorkoutsDesc: 'Effectuez votre première séance pour débloquer vos statistiques', startFirst: 'Première séance', kg: 'kg' },
  program: { goal: 'Objectif', level: 'Niveau', frequency: 'Fréquence', duration: 'Durée', description: 'Description', benefits: 'Bénéfices', exercises: 'exercices', sets: 'séries', reps: 'répétitions', rest: 'repos' },
  workout: { chooseProgram: 'Choisissez votre programme', startSession: 'Démarrer', finish: 'Terminer', completeWorkout: 'Terminer la séance', addSet: 'Ajouter une série', notes: 'Notes sur cette séance', set: 'SÉRIE', kg: 'KG', reps: 'RÉP', rpe: 'RPE', duration: 'Durée', success: 'Réussite', complete: 'Séance terminée', backToDash: 'Tableau de bord', newWorkout: 'Nouvelle séance' },
  stats: { yourPerformance: 'Vos performances', statistics: 'Statistiques', totalVolume: 'Volume total', sessions: 'Séances', dayStreak: 'Jours consécutifs', avgVolume: 'Volume moyen', thisWeek: 'Cette semaine', bestSession: 'Meilleure séance', weeklyVolume: 'Volume hebdomadaire', muscleDistribution: 'Répartition musculaire', recentSessions: 'Dernières séances', noData: 'Pas encore de données', noSessions: 'Aucune séance enregistrée' },
  auth: { welcomeBack: 'Bon retour', signInToContinue: 'Connectez-vous pour continuer', noAccount: 'Pas de compte ?', createOne: 'Créer un compte', email: 'Email', password: 'Mot de passe', signingIn: 'Connexion...', signIn: 'Se connecter', invalidCredentials: 'Email ou mot de passe incorrect', createAccount: 'Créer un compte', beginJourney: 'Commencez votre parcours fitness', username: 'Nom d\'utilisateur', fullName: 'Nom complet', creatingAccount: 'Création...', alreadyHaveAccount: 'Déjà un compte ?', registrationFailed: 'Échec de l\'inscription', profile: 'Profil', notSet: 'Non défini' },
  landing: { nextLevel: 'Plateforme d\'entraînement nouvelle génération', heroTitle: 'IRON', heroTitleAccent: 'TRACK', heroDesc: 'Chaque répétition compte. Chaque série compte.', heroDesc2: 'La plateforme de musculation la plus avancée au monde.', startFree: 'Essai gratuit', builtFor: 'Conçu pour les', ironMindsets: 'mentalités de fer', dominate: 'Tout ce dont vous avez besoin pour dominer vos entraînements', quote: '"Vous n\'êtes en compétition avec personne d\'autre. Votre seul adversaire, c\'est vous-même."', quoteAuthor: '— David Goggins', readyToTransform: 'Prêt à', transform: 'transformer', joinThousands: 'Rejoignez des milliers d\'athlètes qui suivent déjà leur progression.' },
  features: { programBuilder: 'Créateur de programmes', programBuilderDesc: 'Concevez des programmes personnalisés avec semaines, jours et exercices. Clonez et adaptez n\'importe quel modèle.', liveLogger: 'Logger en direct', liveLoggerDesc: 'Enregistrez chaque série en temps réel avec sauvegarde automatique. Détection intelligente des records.', analytics: 'Analyses', analyticsDesc: 'Statistiques complètes sur les tendances de volume, fréquence, séries et plateaux. Export CSV ou PDF.', prDetection: 'Détection de records', prDetectionDesc: 'Alertes automatiques de records 1RM et volume. Célébration à chaque nouveau record.' },
  programsList: {
    ppl: 'Push Pull Legs', pplDesc: 'Programme séparant les mouvements par fonction biomécanique.',
    upperLower: 'Upper / Lower Split', upperLowerDesc: 'Haut du corps et bas du corps travaillés deux fois par semaine.',
    hilv: 'HILV', hilvDesc: 'Haute intensité, faible volume — chaque série poussée à l\'échec.',
    broSplit: 'Bro Split', broSplitDesc: 'Split traditionnel de bodybuilding. Chaque groupe musculaire a son propre jour.',
    fullBody: 'Full Body', fullBodyDesc: 'Corps complet à chaque séance. Idéal pour débutants et perte de poids.',
    powerlifting: 'Powerlifting', powerliftingDesc: 'Programme orienté performance sur les trois mouvements de compétition.',
    hypertrophy: 'Hypertrophie', hypertrophyDesc: 'Optimisé pour la croissance musculaire. 8–15 répétitions, repos 60–90s.',
    strengthHypertrophy: 'Force & Hypertrophie', strengthHypertrophyDesc: 'Combinaison parfaite de force et prise de masse.',
    massGain: 'Prise de masse', massGainDesc: 'Prise de masse',
    strength: 'Force', strengthDesc: 'Force',
    aesthetic: 'Esthétique', aestheticDesc: 'Esthétique',
    beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé',
    beginnerToAdvanced: 'Débutant à Avancé',
    intermediateToAdvanced: 'Intermédiaire à Avancé',
    sessionsPerWeek: 'séances/semaine',
  },
  time: { minutes: 'min', hours: 'h', days: 'jours' },
  footer: { allRights: 'Tous droits réservés.' },
}

const es: DeepRecord = {
  nav: { home: 'Inicio', features: 'Características', dashboard: 'Panel', programs: 'Coach IA', workout: 'Entrenamiento', stats: 'Estadísticas', profile: 'Perfil', signIn: 'Iniciar sesión', getStarted: 'Comenzar', signOut: 'Cerrar sesión' },
  hero: { welcomeBack: 'Bienvenido de nuevo', startWorkout: 'Entrenar', totalVolume: 'Volumen total', workouts: 'Entrenos', hours: 'Horas', prs: 'RPs' },
  dash: { programs: 'Programas', history: 'Historial', featured: 'Programa destacado', startProgram: 'Iniciar', noWorkouts: 'Sin entrenos', noWorkoutsDesc: 'Completa tu primer entreno para ver estadísticas', startFirst: 'Primer entreno', kg: 'kg' },
  program: { goal: 'Objetivo', level: 'Nivel', frequency: 'Frecuencia', duration: 'Duración', description: 'Descripción', benefits: 'Beneficios', exercises: 'ejercicios', sets: 'series', reps: 'repeticiones', rest: 'descanso' },
  workout: { chooseProgram: 'Elige tu programa', startSession: 'Comenzar', finish: 'Finalizar', completeWorkout: 'Completar entreno', addSet: 'Añadir serie', notes: 'Notas del entreno', set: 'SERIE', kg: 'KG', reps: 'REP', rpe: 'RPE', duration: 'Duración', success: 'Éxito', complete: 'Entreno completo', backToDash: 'Volver al panel', newWorkout: 'Nuevo entreno' },
  stats: { yourPerformance: 'Tu rendimiento', statistics: 'Estadísticas', totalVolume: 'Volumen total', sessions: 'Entrenos', dayStreak: 'Días seguidos', avgVolume: 'Volumen medio', thisWeek: 'Esta semana', bestSession: 'Mejor entreno', weeklyVolume: 'Volumen semanal', muscleDistribution: 'Distribución muscular', recentSessions: 'Últimos entrenos', noData: 'Sin datos aún', noSessions: 'Sin entrenos registrados' },
  auth: { welcomeBack: 'Bienvenido', signInToContinue: 'Inicia sesión para continuar', noAccount: '¿Sin cuenta?', createOne: 'Crear una', email: 'Email', password: 'Contraseña', signingIn: 'Iniciando...', signIn: 'Iniciar sesión', invalidCredentials: 'Email o contraseña incorrectos', createAccount: 'Crear cuenta', beginJourney: 'Comienza tu viaje fitness', username: 'Usuario', fullName: 'Nombre completo', creatingAccount: 'Creando...', alreadyHaveAccount: '¿Ya tienes cuenta?', registrationFailed: 'Error al registrarse', profile: 'Perfil', notSet: 'No establecido' },
  landing: { nextLevel: 'Plataforma de entrenamiento de élite', heroTitle: 'IRON', heroTitleAccent: 'TRACK', heroDesc: 'Cada repetición cuenta. Cada serie importa.', heroDesc2: 'La plataforma de musculación más avanzada del planeta.', startFree: 'Prueba gratuita', builtFor: 'Construido para', ironMindsets: 'mentalidades de hierro', dominate: 'Todo lo que necesitas para dominar tu entrenamiento', quote: '"No compites contra nadie más. Tu único rival eres tú mismo."', quoteAuthor: '— David Goggins', readyToTransform: '¿Listo para', transform: 'transformarte', joinThousands: 'Únete a miles de atletas que ya registran su progreso.' },
  features: { programBuilder: 'Constructor de programas', programBuilderDesc: 'Diseña programas personalizados con semanas, días y ejercicios.', liveLogger: 'Registro en vivo', liveLoggerDesc: 'Registra cada serie en tiempo real con auto-guardado.', analytics: 'Analíticas', analyticsDesc: 'Estadísticas completas de volumen, frecuencia y progreso.', prDetection: 'Detección de RP', prDetectionDesc: 'Alertas automáticas de RP de 1RM y volumen.' },
  programsList: {
    ppl: 'Push Pull Legs', pplDesc: 'Programa que separa movimientos por función biomecánica.',
    upperLower: 'Upper / Lower Split', upperLowerDesc: 'Tren superior e inferior trabajados dos veces por semana.',
    hilv: 'HILV', hilvDesc: 'Alta intensidad, bajo volumen — cada serie al fallo.',
    broSplit: 'Bro Split', broSplitDesc: 'División tradicional de culturismo. Cada grupo muscular en su propio día.',
    fullBody: 'Cuerpo Completo', fullBodyDesc: 'Cuerpo completo cada sesión. Ideal para principiantes.',
    powerlifting: 'Powerlifting', powerliftingDesc: 'Programa de rendimiento en los tres levantamientos de competición.',
    hypertrophy: 'Hipertrofia', hypertrophyDesc: 'Optimizado para crecimiento muscular. 8–15 reps, 60–90s descanso.',
    strengthHypertrophy: 'Fuerza e Hipertrofia', strengthHypertrophyDesc: 'Combinación perfecta de fuerza y masa.',
    massGain: 'Ganancia de masa', massGainDesc: 'Ganancia de masa',
    strength: 'Fuerza', strengthDesc: 'Fuerza',
    aesthetic: 'Estética', aestheticDesc: 'Estética',
    beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado',
    beginnerToAdvanced: 'Principiante a avanzado',
    intermediateToAdvanced: 'Intermedio a avanzado',
    sessionsPerWeek: 'sesiones/semana',
  },
  time: { minutes: 'min', hours: 'h', days: 'días' },
  footer: { allRights: 'Todos los derechos reservados.' },
}

const de: DeepRecord = {
  nav: { home: 'Start', features: 'Funktionen', dashboard: 'Dashboard', programs: 'Coach KI', workout: 'Training', stats: 'Statistiken', profile: 'Profil', signIn: 'Anmelden', getStarted: 'Loslegen', signOut: 'Abmelden' },
  hero: { welcomeBack: 'Willkommen zurück', startWorkout: 'Training starten', totalVolume: 'Gesamtvolumen', workouts: 'Trainings', hours: 'Stunden', prs: 'PRs' },
  dash: { programs: 'Programme', history: 'Verlauf', featured: 'Vorgestelltes Programm', startProgram: 'Starten', noWorkouts: 'Keine Trainings', noWorkoutsDesc: 'Absolviere dein erstes Training', startFirst: 'Erstes Training', kg: 'kg' },
  program: { goal: 'Ziel', level: 'Niveau', frequency: 'Häufigkeit', duration: 'Dauer', description: 'Beschreibung', benefits: 'Vorteile', exercises: 'Übungen', sets: 'Sätze', reps: 'Wiederholungen', rest: 'Pause' },
  workout: { chooseProgram: 'Wähle dein Programm', startSession: 'Starten', finish: 'Beenden', completeWorkout: 'Training beenden', addSet: 'Satz hinzufügen', notes: 'Notizen zum Training', set: 'SATZ', kg: 'KG', reps: 'WDH', rpe: 'RPE', duration: 'Dauer', success: 'Erfolg', complete: 'Training abgeschlossen', backToDash: 'Zum Dashboard', newWorkout: 'Neues Training' },
  stats: { yourPerformance: 'Deine Leistung', statistics: 'Statistiken', totalVolume: 'Gesamtvolumen', sessions: 'Einheiten', dayStreak: 'Tage Serie', avgVolume: 'Durchschnitt', thisWeek: 'Diese Woche', bestSession: 'Beste Einheit', weeklyVolume: 'Wöchentliches Volumen', muscleDistribution: 'Muskelverteilung', recentSessions: 'Letzte Einheiten', noData: 'Noch keine Daten', noSessions: 'Keine Einheiten aufgezeichnet' },
  auth: { welcomeBack: 'Willkommen zurück', signInToContinue: 'Melde dich an um fortzufahren', noAccount: 'Kein Konto?', createOne: 'Erstellen', email: 'E-Mail', password: 'Passwort', signingIn: 'Anmelden...', signIn: 'Anmelden', invalidCredentials: 'Falsche E-Mail oder Passwort', createAccount: 'Konto erstellen', beginJourney: 'Beginne deine Fitnessreise', username: 'Benutzername', fullName: 'Vollständiger Name', creatingAccount: 'Erstelle...', alreadyHaveAccount: 'Bereits ein Konto?', registrationFailed: 'Registrierung fehlgeschlagen', profile: 'Profil', notSet: 'Nicht festgelegt' },
  landing: { nextLevel: 'Trainingsplattform der nächsten Stufe', heroTitle: 'IRON', heroTitleAccent: 'TRACK', heroDesc: 'Jede Wiederholung zählt. Jeder Satz ist wichtig.', heroDesc2: 'Die fortschrittlichste Bodybuilding-Plattform der Welt.', startFree: 'Kostenlos testen', builtFor: 'Entwickelt für', ironMindsets: 'eiserne Mentalitäten', dominate: 'Alles was du brauchst um dein Training zu dominieren', quote: '"Du konkurrierst mit niemandem außer dir selbst."', quoteAuthor: '— David Goggins', readyToTransform: 'Bereit dich zu', transform: 'verändern', joinThousands: 'Tausende Athleten verfolgen bereits ihre Fortschritte.' },
  features: { programBuilder: 'Programm-Builder', programBuilderDesc: 'Erstelle benutzerdefinierte Trainingspläne mit Wochen, Tagen und Übungen.', liveLogger: 'Live-Logger', liveLoggerDesc: 'Erfasse jeden Satz in Echtzeit mit automatischer Speicherung.', analytics: 'Analysen', analyticsDesc: 'Umfassende Statistiken zu Volumen, Häufigkeit und Fortschritt.', prDetection: 'PR-Erkennung', prDetectionDesc: 'Automatische 1RM- und Volumen-PR-Benachrichtigungen.' },
  programsList: {
    ppl: 'Push Pull Legs', pplDesc: 'Programm nach biomechanischer Funktion aufgeteilt.',
    upperLower: 'Oberkörper/Unterkörper', upperLowerDesc: 'Ober- und Unterkörper zweimal pro Woche trainiert.',
    hilv: 'HILV', hilvDesc: 'Hohe Intensität, niedriges Volumen — jeder Satz bis zum Muskelversagen.',
    broSplit: 'Bro Split', broSplitDesc: 'Traditionelles Bodybuilding-Split. Jede Muskelgruppe hat ihren eigenen Tag.',
    fullBody: 'Ganzkörper', fullBodyDesc: 'Ganzkörpertraining in jeder Einheit. Ideal für Anfänger.',
    powerlifting: 'Powerlifting', powerliftingDesc: 'Leistungsorientiertes Programm für die drei Wettkampfübungen.',
    hypertrophy: 'Hypertrophie', hypertrophyDesc: 'Optimiert für Muskelwachstum. 8–15 Wiederholungen, 60–90s Pause.',
    strengthHypertrophy: 'Kraft & Hypertrophie', strengthHypertrophyDesc: 'Perfekte Kombination aus Kraft und Masseaufbau.',
    massGain: 'Masseaufbau', massGainDesc: 'Masseaufbau',
    strength: 'Kraft', strengthDesc: 'Kraft',
    aesthetic: 'Ästhetik', aestheticDesc: 'Ästhetik',
    beginner: 'Anfänger', intermediate: 'Fortgeschritten', advanced: 'Experte',
    beginnerToAdvanced: 'Anfänger bis Experte',
    intermediateToAdvanced: 'Fortgeschritten bis Experte',
    sessionsPerWeek: 'Einheiten/Woche',
  },
  time: { minutes: 'Min', hours: 'Std', days: 'Tage' },
  footer: { allRights: 'Alle Rechte vorbehalten.' },
}

const ar: DeepRecord = {
  nav: { home: 'الرئيسية', features: 'المميزات', dashboard: 'لوحة التحكم', programs: 'المدرب الذكي', workout: 'التمرين', stats: 'الإحصائيات', profile: 'الملف الشخصي', signIn: 'تسجيل الدخول', getStarted: 'ابدأ الآن', signOut: 'تسجيل الخروج' },
  hero: { welcomeBack: 'مرحباً بعودتك', startWorkout: 'ابدأ التمرين', totalVolume: 'الحجم الكلي', workouts: 'التمارين', hours: 'الساعات', prs: 'الأرقام القياسية' },
  dash: { programs: 'البرامج', history: 'السجل', featured: 'برنامج مميز', startProgram: 'ابدأ البرنامج', noWorkouts: 'لا توجد تمارين', noWorkoutsDesc: 'أكمل أول تمرين لفتح إحصائياتك', startFirst: 'أول تمرين', kg: 'كجم' },
  program: { goal: 'الهدف', level: 'المستوى', frequency: 'التكرار', duration: 'المدة', description: 'الوصف', benefits: 'الفوائد', exercises: 'تمارين', sets: 'مجموعات', reps: 'تكرارات', rest: 'راحة' },
  workout: { chooseProgram: 'اختر برنامجك', startSession: 'ابدأ', finish: 'إنهاء', completeWorkout: 'أكمل التمرين', addSet: 'أضف مجموعة', notes: 'ملاحظات عن هذا التمرين', set: 'المجموعة', kg: 'كجم', reps: 'تكرار', rpe: 'RPE', duration: 'المدة', success: 'النجاح', complete: 'تم التمرين', backToDash: 'العودة للوحة', newWorkout: 'تمرين جديد' },
  stats: { yourPerformance: 'أدائك', statistics: 'الإحصائيات', totalVolume: 'الحجم الكلي', sessions: 'الجلسات', dayStreak: 'أيام متتالية', avgVolume: 'متوسط الحجم', thisWeek: 'هذا الأسبوع', bestSession: 'أفضل جلسة', weeklyVolume: 'الحجم الأسبوعي', muscleDistribution: 'توزيع العضلات', recentSessions: 'آخر الجلسات', noData: 'لا توجد بيانات بعد', noSessions: 'لا توجد جلسات مسجلة' },
  auth: { welcomeBack: 'مرحباً بعودتك', signInToContinue: 'سجل الدخول للمتابعة', noAccount: 'ليس لديك حساب؟', createOne: 'إنشاء حساب', email: 'البريد الإلكتروني', password: 'كلمة المرور', signingIn: 'تسجيل الدخول...', signIn: 'تسجيل الدخول', invalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صحيحة', createAccount: 'إنشاء حساب', beginJourney: 'ابدأ رحلة اللياقة البدنية', username: 'اسم المستخدم', fullName: 'الاسم الكامل', creatingAccount: 'جارٍ الإنشاء...', alreadyHaveAccount: 'لديك حساب بالفعل؟', registrationFailed: 'فشل التسجيل', profile: 'الملف الشخصي', notSet: 'غير محدد' },
  landing: { nextLevel: 'منصة تدريب من المستوى التالي', heroTitle: 'آيرون', heroTitleAccent: 'تراك', heroDesc: 'تتبع كل تكرار. اسحق كل مجموعة. حطم كل حد.', heroDesc2: 'أكثر منصة لكمال الأجسام تقدماً على هذا الكوكب.', startFree: 'ابدأ النسخة التجريبية', builtFor: 'مصممة لـ', ironMindsets: 'عقول حديدية', dominate: 'كل ما تحتاجه للسيطرة على تدريبك', quote: '"أنت لا تتنافس مع أي شخص آخر. منافسك الوحيد هو نفسك."', quoteAuthor: '— ديفيد غوغينز', readyToTransform: 'هل أنت مستعد لـ', transform: 'التحول', joinThousands: 'انضم إلى آلاف الرياضيين الذين يتتبعون تقدمهم بالفعل.' },
  features: { programBuilder: 'منشئ البرامج', programBuilderDesc: 'صمم برامج تدريب مخصصة بالأسابيع والأيام والتمارين.', liveLogger: 'تسجيل مباشر', liveLoggerDesc: 'سجل كل مجموعة في الوقت الفعلي مع الحفظ التلقائي.', analytics: 'التحليلات', analyticsDesc: 'إحصائيات شاملة لاتجاهات الحجم والتكرار والتقدم.', prDetection: 'كشف الأرقام القياسية', prDetectionDesc: 'تنبيهات تلقائية للأرقام القياسية في 1RM والحجم.' },
  programsList: {
    ppl: 'دفع سحب أرجل', pplDesc: 'برنامج يقسم الحركات حسب الوظيفة البيوميكانيكية.',
    upperLower: 'تقسيم علوي/سفلي', upperLowerDesc: 'الجزء العلوي والسفلي من الجسم يمرن مرتين في الأسبوع.',
    hilv: 'HILV', hilvDesc: 'كثافة عالية بحجم منخفض — كل مجموعة حتى الفشل العضلي.',
    broSplit: 'تقسيم محترف', broSplitDesc: 'تقسيم كمال الأجسام التقليدي. كل مجموعة عضلية لها يومها الخاص.',
    fullBody: 'كامل الجسم', fullBodyDesc: 'تمرين كامل الجسم في كل جلسة. مثالي للمبتدئين.',
    powerlifting: 'رفع الأثقال', powerliftingDesc: 'برنامج موجه للأداء في تمارين المنافسة الثلاثة.',
    hypertrophy: 'تضخم عضلي', hypertrophyDesc: 'محسن لنمو العضلات. 8–15 تكرارات، راحة 60–90 ثانية.',
    strengthHypertrophy: 'قوة وتضخم', strengthHypertrophyDesc: 'مزيج مثالي من القوة وزيادة الكتلة.',
    massGain: 'زيادة الكتلة', massGainDesc: 'زيادة الكتلة',
    strength: 'قوة', strengthDesc: 'قوة',
    aesthetic: 'جمالي', aestheticDesc: 'جمالي',
    beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم',
    beginnerToAdvanced: 'من مبتدئ إلى متقدم',
    intermediateToAdvanced: 'من متوسط إلى متقدم',
    sessionsPerWeek: 'جلسات/أسبوع',
  },
  time: { minutes: 'دقيقة', hours: 'ساعة', days: 'أيام' },
  footer: { allRights: 'جميع الحقوق محفوظة.' },
}

export const translations: Record<Lang, DeepRecord> = { en, fr, es, de, ar }

export function t(key: string, lang: Lang): string {
  const keys = key.split('.')
  let val: any = translations[lang]
  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) val = val[k]
    else return key
  }
  return typeof val === 'string' ? val : key
}

