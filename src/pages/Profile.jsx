import React, { useState } from 'react'

export default function Profile({ auth }) {
  const [username, setUsername] = useState(auth.user?.username || "")
  const [email, setEmail] = useState(auth.user?.email || "")
  const [message, setMessage] = useState("")

  function handleSave(e) {
    e.preventDefault()
    // Call API here to update profile
    // Example: await api.updateProfile({ username, email })
    setMessage("Profile updated successfully ✅")
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button 
          type="submit" 
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Save
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  )
}
