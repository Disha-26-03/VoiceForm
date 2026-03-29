import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'
import voiceImage from '../assets/voiceImage.jpg'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      <div style={styles.container}>

        {/* Left Panel - Image */}
        <div style={styles.leftPanel}>
          <img src={voiceImage} alt="login" style={styles.image} />
          <div style={styles.overlay} />
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div style={styles.formCard}>

            {/* Logo */}
            <h2 style={styles.logoRow}>
              <span style={styles.logoIcon}>⚡</span>
              <span style={styles.logoText}>LOGIN </span>
            </h2>

            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Welcome Back</h2>
              <p style={styles.formSubtitle}>Sign in to continue to your dashboard</p>
            </div>

            <form onSubmit={handleLogin} style={styles.form}>

              {/* Username */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <div style={{
                  ...styles.inputWrapper,
                  borderColor: focusedField === 'username' ? '#4f46e5' : '#e5e7eb',
                  boxShadow: focusedField === 'username' ? '0 0 0 3px rgba(79,70,229,0.1)' : 'none'
                }}>
                  <span style={styles.inputIcon}>👤</span>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={{
                  ...styles.inputWrapper,
                  borderColor: focusedField === 'password' ? '#4f46e5' : '#e5e7eb',
                  boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(79,70,229,0.1)' : 'none'
                }}>
                  <span style={styles.inputIcon}>🔒</span>
                  <input
                    style={styles.input}
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                  <span style={styles.eyeIcon} onClick={() => setShowPass(!showPass)}>
                    {showPass ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={styles.errorBox}>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                style={{ ...styles.loginBtn, opacity: loading ? 0.8 : 1 }}
                disabled={loading}
              >
                {loading ? (
                  <span> Signing in...</span>
                ) : (
                  <span>Sign In →</span>
                )}
              </button>

            </form>

           
          </div>
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    background: '#0f0c29',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Georgia', serif"
  },
  blob1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79,70,229,0.4) 0%, transparent 70%)',
    top: '-100px',
    left: '-100px',
    filter: 'blur(60px)'
  },
  blob2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
    bottom: '-80px',
    right: '-80px',
    filter: 'blur(60px)'
  },
  blob3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(80px)'
  },
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden'
  },
  leftPanel: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    minHeight: '100vh'
  },
  image: {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(30,27,75,0.5) 0%, rgba(79,70,229,0.3) 100%)'
  },
  rightPanel: {
    flex: 1,
    background: 'linear-gradient(160deg, #ffffff 60%, #f5f3ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 40px',
    boxSizing: 'border-box'
  },
  formCard: {
    width: '100%',
    maxWidth: '360px'
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '32px'
  },
  logoIcon: {
    fontSize: '28px',
    filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.8))'
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e1b4b',
    letterSpacing: '0.5px'
  },
  formHeader: {
    marginBottom: '28px'
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e1b4b',
    margin: '0 0 6px',
    letterSpacing: '-0.5px'
  },
  formSubtitle: {
    color: '#9ca3af',
    fontSize: '14px',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    letterSpacing: '0.3px'
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#fff',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  inputIcon: {
    padding: '0 14px',
    fontSize: '16px',
    borderRight: '1.5px solid #f3f4f6',
    color: '#6b7280'
  },
  input: {
    flex: 1,
    padding: '14px 14px',
    border: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#1f2937',
    outline: 'none',
    fontFamily: 'inherit'
  },
  eyeIcon: {
    padding: '0 14px',
    fontSize: '16px',
    cursor: 'pointer',
    userSelect: 'none',
    color: '#9ca3af'
  },
  errorBox: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '500'
  },
  loginBtn: {
    padding: '15px',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(79,70,229,0.4)',
    marginTop: '4px',
    letterSpacing: '0.3px',
    transition: 'transform 0.1s'
  },
  footer: {
    textAlign: 'center',
    marginTop: '28px',
    color: '#9ca3af',
    fontSize: '12px',
    letterSpacing: '0.3px'
  }
}

export default Login