import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Mail, Lock } from 'lucide-react'
import { getRoleByEmail } from '@/lib/mockUsers'

export default function EmployeeLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend-only validation: prevent admin accounts from using employee login
    const role = getRoleByEmail(form.email)
    if (role !== 'employee') {
      setError(role === 'admin' ? 'This appears to be an admin account — use Admin login.' : 'No employee account found for this email.')
      return
    }
    // Frontend indication only — real auth should verify employee role/server-side
    console.log('Employee login payload:', form)
  }

  const ready = form.email.length > 0 && form.password.length > 0

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-2 text-xl font-bold">Growcode Solution — Employee Login</div>
            <CardDescription>Employee login only. Use your employee credentials to access dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="email" type="email" value={form.email} onChange={handleChange} className="pl-10" placeholder="you@company.com" required />
                </div>
              </div>

              <div>
                <label className="text-sm">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="password" type="password" value={form.password} onChange={handleChange} className="pl-10" required />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={!ready}>Log In</Button>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

              <div className="text-center mt-2 flex justify-center gap-2">
                <p className="text-sm text-gray-600">Don't have an employee account?</p>
                <Link to="/employe" className="text-sm text-blue-600 hover:underline">Create account</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
