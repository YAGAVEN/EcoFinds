
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthPage({ auth }){
  const [isSignUp,setIsSignUp] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const nav = useNavigate()

  function submit(e){
    e.preventDefault()
    // TODO: implement auth.register / auth.login with backend
    alert('Auth actions are intentionally left blank. Implement backend logic in src/hooks/useAuth.js')
    nav('/')
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Create account' : 'Login'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Password" type="password" required />
        {isSignUp && <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full p-2 border rounded" placeholder="Username" />}
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">{isSignUp ? 'Sign up' : 'Login'}</button>
          <button type="button" className="text-sm text-emerald-600" onClick={()=>setIsSignUp(!isSignUp)}>{isSignUp ? 'Have an account? Login' : "Don't have an account? Sign up"}</button>
        </div>
      </form>
    </div>
  )
}
