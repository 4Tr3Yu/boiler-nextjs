'use client'

import { useState } from 'react'
import { updatePassword } from '@/app/profile/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    const result = await updatePassword(formData)

    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ 
        type: 'success', 
        text: result.message || 'Password updated successfully!' 
      })
      // Clear form on success
      const form = document.getElementById('password-form') as HTMLFormElement
      form?.reset()
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="password-form" action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={6}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 6 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="border-2 border-purple-950 bg-transparent hover:bg-purple-950 text-white cursor-pointer">
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
