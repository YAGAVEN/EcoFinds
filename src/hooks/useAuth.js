
import { useState } from 'react'

// This hook is intentionally left minimal and empty for you to plug in your backend/auth.
// It provides the shape used by the pages but does not implement storage or logic.

export default function useAuth(){
  const [user, setUser] = useState(null)

  function login(email, password){
    // TODO: call your backend and set the authenticated user
    console.warn('login not implemented')
    return { ok: false, error: 'Not implemented' }
  }

  function register(email, password, username){
    // TODO: call backend to create account
    console.warn('register not implemented')
    return { ok: false, error: 'Not implemented' }
  }

  function logout(){
    setUser(null)
  }

  function updateProfile(changes){
    // TODO: call backend to update user profile
    console.warn('updateProfile not implemented')
  }

  return { user, login, register, logout, updateProfile }
}
