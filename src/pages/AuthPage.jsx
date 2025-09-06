import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthPage({ auth }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [imageurl, setImageurl] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    
    try {
      let result
      if (isSignUp) {
        result = await auth.register(email, password, username, bio, imageurl)
      } else {
        result = await auth.login(email, password)
      }

      if (result.ok) {
        alert(isSignUp ? "Registered successfully!" : "Logged in successfully!")
        nav('/')
      } else {
        alert("Error: " + result.error)
      }
    } catch (error) {
      alert("Network or server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Create account' : 'Login'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Email"
          required
          type="email"
        />
        {isSignUp && (
          <>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Username"
              required={isSignUp}
            />
            <input
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Bio"
            />
            <input
              value={imageurl}
              onChange={e => setImageurl(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Image URL"
            />
          </>
        )}
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Password"
          type="password"
          required
        />

        <div className="flex items-center justify-between">
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign up' : 'Login')}
          </button>
          <button
            type="button"
            className="text-sm text-emerald-600"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Have an account? Login' : "Don't have an account? Sign up"}
          </button>
        </div>
      </form>
    </div>
  )
}
