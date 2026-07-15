import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Landing from '../pages/Landing'
import OpenCode from '../pages/OpenCode'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MagicLogin from '../pages/MagicLogin'
import Dashboard from '../pages/Dashboard'
import Programs from '../pages/Programs'
import WorkoutLogger from '../pages/WorkoutLogger'
import Stats from '../pages/Stats'
import History from '../pages/History'
import Profile from '../pages/Profile'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="app-layout"><Navbar /><main className="app-main">{children}</main><Footer /></div>
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <PublicLayout>{children}</PublicLayout>
}

export default function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
      <Route path="/opencode" element={<OpenCode />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthLayout><Register /></AuthLayout>} />
      <Route path="/magic-login" element={<MagicLogin />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/programs" element={<ProtectedRoute><Programs /></ProtectedRoute>} />
      <Route path="/workout" element={<ProtectedRoute><WorkoutLogger /></ProtectedRoute>} />
      <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
