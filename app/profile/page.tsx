import { redirect } from 'next/navigation'
import { getProfile } from './actions'
import { ProfileForm } from '@/components/profile/profile-form'
import { EmailForm } from '@/components/profile/email-form'
import { PasswordForm } from '@/components/profile/password-form'
import { createClient } from '@/utils/supabase/server'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const result = await getProfile()

  if (result.error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">Error loading profile: {result.error}</div>
      </div>
    )
  }

  const { profile, email } = result

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          <ProfileForm initialData={profile || { nickname: null, phone: null, country: null }} />
          <EmailForm currentEmail={email} />
          <PasswordForm />
        </div>
      </div>
    </div>
  )
}
