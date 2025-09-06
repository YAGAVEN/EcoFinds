
import React, { useState, useEffect } from 'react'

export default function Profile({ auth }){
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ username: '', email: '' })

  useEffect(()=>{
    if(auth.user) setForm({ username: auth.user.username || '', email: auth.user.email || '' })
  }, [auth.user])

  function save(){
    // TODO: implement profile update via API
    alert('Profile update left empty. Implement update in your backend integration.')
    setEditing(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Profile</h3>
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-xl">U</div>
          <div className="flex-1">
            {!editing ? (
              <>
                <div className="font-semibold">{auth.user?.username || 'Guest'}</div>
                <div className="text-sm text-gray-500">{auth.user?.email || 'No email'}</div>
                <div className="mt-3"><button onClick={()=>setEditing(true)} className="px-3 py-1 bg-emerald-600 text-white rounded">Edit</button></div>
              </>
            ) : (
              <div className="space-y-2">
                <input value={form.username} onChange={e=>setForm({...form, username: e.target.value})} className="p-2 border rounded w-full" />
                <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="p-2 border rounded w-full" />
                <div className="flex gap-2 mt-2">
                  <button onClick={save} className="px-3 py-1 bg-emerald-600 text-white rounded">Save</button>
                  <button onClick={()=>setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
