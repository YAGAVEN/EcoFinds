import React, { useState, useEffect } from 'react'

export default function Profile({ auth }) {
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [avatar_url, setAvatar_url] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (auth.user) {
      setUsername(auth.user.username || "")
      setBio(auth.user.bio || "")
      setAvatar_url(auth.user.avatar_url || "")
    }
  }, [auth.user])

  async function handleSave(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      console.log("Updating profile with:", { username, bio, avatar_url })
      const result = await auth.updateProfile({
        username,
        bio,
        avatar_url
      })

      console.log("Profile update result:", result)

      if (result.ok) {
        setMessage("Profile updated successfully ✅")
      } else {
        setMessage("Error: " + result.error)
      }
    } catch (error) {
      console.error("Profile update error:", error)
      setMessage("Error updating profile: " + error.message)
    } finally {
      setLoading(false)
    }
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
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Avatar URL</label>
          <input 
            type="url" 
            value={avatar_url} 
            onChange={(e) => setAvatar_url(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  )
}
