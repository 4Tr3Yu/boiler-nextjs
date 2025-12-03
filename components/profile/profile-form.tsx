'use client'

import { useState } from 'react'
import { updateProfile, type ProfileData } from '@/app/profile/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
  'France', 'Spain', 'Italy', 'Brazil', 'Mexico', 'Argentina', 'Japan',
  'China', 'India', 'South Korea', 'Netherlands', 'Sweden', 'Norway',
  'Denmark', 'Finland', 'Switzerland', 'Austria', 'Belgium', 'Portugal',
  'Poland', 'Czech Republic', 'Ireland', 'New Zealand', 'Singapore',
  'Other'
]

type ProfileFormProps = {
  initialData: ProfileData
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [selectedCountry, setSelectedCountry] = useState(initialData.country || '')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)

    const result = await updateProfile(formData)

    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="Your nickname"
              defaultValue={initialData.nickname || ''}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              defaultValue={initialData.phone || ''}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <input type="hidden" name="country" value={selectedCountry} />
            <Select value={selectedCountry} onValueChange={setSelectedCountry} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
