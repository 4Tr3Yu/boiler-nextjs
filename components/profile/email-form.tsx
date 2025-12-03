'use client'

import { useState } from 'react'
import { updateEmail } from '@/app/profile/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type EmailFormProps = {
  currentEmail: string | undefined
}

export function EmailForm({ currentEmail }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    const result = await updateEmail(formData)

    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ 
        type: 'success', 
        text: result.message || 'Verification email sent!' 
      })
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
        <CardDescription>Update your email address</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-email">Current Email</Label>
            <Input
              id="current-email"
              type="email"
              value={currentEmail || ''}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">New Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="new@example.com"
              required
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
            {isLoading ? 'Updating...' : 'Update Email'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
