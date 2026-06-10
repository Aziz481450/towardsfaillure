import { createContext, useState, useEffect, type ReactNode } from 'react'
import { authService, type UserInfo, type LoginDto, type RegisterDto, type SocialLoginDto } from '../services/authService'

interface AuthContextType {
  user: UserInfo | null
  token: string | null
  login: (dto: LoginDto) => Promise<void>
  register: (dto: RegisterDto) => Promise<void>
  socialLogin: (dto: SocialLoginDto) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (dto: LoginDto) => {
    const res = await authService.login(dto)
    if (res.success && res.data) {
      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setToken(res.data.accessToken)
      setUser(res.data.user)
    }
  }

  const register = async (dto: RegisterDto) => {
    const res = await authService.register(dto)
    if (res.success && res.data) {
      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setToken(res.data.accessToken)
      setUser(res.data.user)
    }
  }

  const socialLogin = async (dto: SocialLoginDto) => {
    const res = await authService.socialLogin(dto)
    if (res.success && res.data) {
      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setToken(res.data.accessToken)
      setUser(res.data.user)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, socialLogin, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}
