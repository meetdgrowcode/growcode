import { useState } from 'react'
import { Card, CardContent, CardHeader,  CardDescription } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { getRoleByEmail } from '@/lib/mockUsers'

export default function AdminSignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // frontend-only validation: ensure this email maps to an admin account
    const role = getRoleByEmail(form.email)
    if (role !== 'admin') {
      setError(role === 'employee' ? 'This appears to be an employee account — use Employee login.' : 'No admin account found for this email.')
      return
    }
    const payload = {
      email: form.email,
      password: form.password,
    }
    console.log('Admin sign in payload:', payload)
    // TODO: wire admin auth
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-2 text-xl font-bold">Growcode Solution — Admin</div>
            <CardDescription>Administrative access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="email" type="email" value={form.email} onChange={handleChange} className="pl-10" placeholder="admin@example.com" required />
                </div>
              </div>

              <div>
                <label className="text-sm">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} className="pl-10" required />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-3 text-gray-500"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full">Sign In</Button>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
