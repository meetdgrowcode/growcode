import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader,  CardDescription } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react'

export default function EmployeeSignIn() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const passwordsMatch = form.password === form.confirmPassword
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordsMatch) return
    const payload = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      password: form.password,
    }
    console.log('Employee sign in payload:', payload)
    // TODO: wire real auth
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-2 text-xl font-bold">Growcode Solution — Employee</div>
            <CardDescription>Access your employe dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Full Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="name" type="text" value={form.name} onChange={handleChange} className="pl-10" placeholder="Jane Doe" required />
                </div>
              </div>

              <div>
                <label className="text-sm">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="email" type="email" value={form.email} onChange={handleChange} className="pl-10" placeholder="you@example.com" required />
                </div>
              </div>

              <div>
                <label className="text-sm">Mobile Number</label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="mobile" type="tel" value={form.mobile} onChange={handleChange} className="pl-10" placeholder="+1 555 555 5555" required />
                </div>
              </div>

              <div>
                <label className="text-sm">Create Password</label>
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

              <div>
                <label className="text-sm">Confirm Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} className="pl-10" required />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-3 top-3 text-gray-500"
                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!passwordsMatch && form.confirmPassword.length > 0 && (
                  <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={!passwordsMatch}>Sign In</Button>

              <div className="text-center mt-2 flex justify-center gap-2">
                <p className="text-sm text-gray-600">Already have an account?</p>
                <Link to="/employe/login" className="text-sm text-blue-600 hover:underline">Log in</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
