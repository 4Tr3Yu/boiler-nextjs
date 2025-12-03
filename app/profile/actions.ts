'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export type ProfileData = {
	nickname: string | null
	phone: string | null
	country: string | null
}

export async function getProfile() {
	const supabase = await createClient()

	const { data: { user }, error: userError } = await supabase.auth.getUser()

	if (userError || !user) {
		return { error: 'Not authenticated' }
	}

	const { data: profile, error: profileError } = await supabase
		.from('profiles')
		.select('nickname, phone, country')
		.eq('id', user.id)
		.single()

	if (profileError) {
		return { error: profileError.message }
	}

	return {
		profile,
		email: user.email
	}
}

export async function updateProfile(formData: FormData) {
	const supabase = await createClient()

	const { data: { user }, error: userError } = await supabase.auth.getUser()

	if (userError || !user) {
		return { error: 'Not authenticated' }
	}

	const profileData: ProfileData = {
		nickname: formData.get('nickname') as string || null,
		phone: formData.get('phone') as string || null,
		country: formData.get('country') as string || null,
	}

	const { error } = await supabase
		.from('profiles')
		.update({
			...profileData,
			updated_at: new Date().toISOString(),
		})
		.eq('id', user.id)

	if (error) {
		return { error: error.message }
	}

	revalidatePath('/profile')
	return { success: true }
}

export async function updateEmail(formData: FormData) {
	const supabase = await createClient()

	const newEmail = formData.get('email') as string

	if (!newEmail) {
		return { error: 'Email is required' }
	}

	const { error } = await supabase.auth.updateUser({
		email: newEmail
	})

	if (error) {
		return { error: error.message }
	}

	revalidatePath('/profile')
	return {
		success: true,
		message: 'Verification email sent to new address. Please check your inbox.'
	}
}

export async function updatePassword(formData: FormData) {
	const supabase = await createClient()

	const currentPassword = formData.get('currentPassword') as string
	const newPassword = formData.get('newPassword') as string
	const confirmPassword = formData.get('confirmPassword') as string

	if (!currentPassword || !newPassword || !confirmPassword) {
		return { error: 'All password fields are required' }
	}

	if (newPassword !== confirmPassword) {
		return { error: 'New passwords do not match' }
	}

	if (newPassword.length < 6) {
		return { error: 'Password must be at least 6 characters' }
	}

	// Verify current password by attempting to sign in
	const { data: { user } } = await supabase.auth.getUser()

	if (!user?.email) {
		return { error: 'User email not found' }
	}

	const { error: signInError } = await supabase.auth.signInWithPassword({
		email: user.email,
		password: currentPassword,
	})

	if (signInError) {
		return { error: 'Current password is incorrect' }
	}

	// Update to new password
	const { error } = await supabase.auth.updateUser({
		password: newPassword
	})

	if (error) {
		return { error: error.message }
	}

	revalidatePath('/profile')
	return { success: true, message: 'Password updated successfully' }
}
