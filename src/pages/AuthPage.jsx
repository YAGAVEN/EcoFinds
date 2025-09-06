import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [imageurl, setImageurl] = useState('')
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      let response
      if (isSignUp) {
        // Call register API
        response = await fetch('http://localhost:8000/users/register', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, username, bio, imageurl })
        })
      } else {
        // Call login API
        response = await fetch('http://localhost:8000/users/login', {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ username: email, password })
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        alert("Error: " + (errorData.detail || "Failed"))
        return
      }

      const data = await response.json()

      if (!isSignUp) {
        // Save token on login
        localStorage.setItem('access_token', data.access_token)
      }

      alert(isSignUp ? "Registered successfully!" : "Logged in successfully!")
      nav('/')  // Navigate to home page after success
    } catch (error) {
      alert("Network or server error")
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
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">
            {isSignUp ? 'Sign up' : 'Login'}
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
