'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
	const supabase = await createClient()

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	console.log('Attempting login with email:', data.email)

	const { error } = await supabase.auth.signInWithPassword(data)

	if (error) {
		console.error('Login error:', error)
		redirect(`/login?error=${encodeURIComponent(error.message)}`)
	}

	revalidatePath('/', 'layout')
	redirect('/profile')
}

export async function signup(formData: FormData) {
	const supabase = await createClient()

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { error } = await supabase.auth.signUp(data)

	if (error) {
		console.error('Signup error:', error)
		redirect(`/login?error=${encodeURIComponent(error.message)}`)
	}

	// Redirect with success message about email verification
	redirect('/login?message=Check your email to confirm your account before logging in')
}
