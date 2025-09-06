
import { useState, useEffect } from 'react'

export default function useAuth(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      getCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  async function getCurrentUser() {
    const token = localStorage.getItem('access_token')
    if (!token) return null

    try {
      const response = await fetch('http://localhost:8000/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        return userData
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('access_token')
        setUser(null)
        return null
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username: email,
          password: password
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { ok: false, error: errorData.detail || 'Login failed' }
      }

      const data = await response.json()
      localStorage.setItem('access_token', data.access_token)
      
      // Fetch user data after successful login
      const userData = await getCurrentUser()
      return { ok: true, user: userData }
    } catch (error) {
      return { ok: false, error: 'Network error' }
    }
  }

  async function register(email, password, username, bio = '', avatar_url = '') {
    try {
      const response = await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          username,
          bio,
          avatar_url
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { ok: false, error: errorData.detail || 'Registration failed' }
      }

      const userData = await response.json()
      return { ok: true, user: userData }
    } catch (error) {
      return { ok: false, error: 'Network error' }
    }
  }

  function logout() {
    localStorage.removeItem('access_token')
    setUser(null)
  }

  async function updateProfile(updates) {
    const token = localStorage.getItem('access_token')
    if (!token) return { ok: false, error: 'Not authenticated' }

    try {
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Profile update error:', errorData)
        return { ok: false, error: errorData.detail || 'Update failed' }
      }

      const updatedUser = await response.json()
      console.log('Profile updated successfully:', updatedUser)
      setUser(updatedUser)
      return { ok: true, user: updatedUser }
    } catch (error) {
      console.error('Profile update network error:', error)
      return { ok: false, error: 'Network error: ' + error.message }
    }
  }

  return { 
    user, 
    loading,
    login, 
    register, 
    logout, 
    updateProfile,
    getCurrentUser
  }
}
