import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

export default function MagicLogin() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('Verifying...')
  const token = params.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('No token provided')
      return
    }
    authService.verifyMagicLink(token).then(res => {
      if (res.success && res.data) {
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        navigate('/dashboard')
      } else {
        setStatus(res.message || 'Link expired or invalid')
        setTimeout(() => navigate('/login'), 3000)
      }
    }).catch(() => {
      setStatus('Verification failed')
      setTimeout(() => navigate('/login'), 3000)
    })
  }, [token, navigate])

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#0A0A0F', color:'#F0EEE8', fontFamily:'system-ui,sans-serif' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid #DC2626', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
        <p>{status}</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
