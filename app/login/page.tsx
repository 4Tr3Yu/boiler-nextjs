import { login, signup } from './actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Login or create an account.</CardDescription>
        </CardHeader>
        <CardContent>
          {params.message && (
            <div className="mb-4 p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-sm">
              {params.message}
            </div>
          )}
          {params.error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 text-sm">
              {params.error}
            </div>
          )}
          <form className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="flex justify-between mt-4">
               <Button formAction={login} className="border-2 border-purple-950 bg-transparent hover:bg-purple-950 text-white cursor-pointer">Log in</Button>
               <Button formAction={signup} className="border-2 border-purple-950 bg-transparent hover:bg-purple-950 text-white cursor-pointer">Sign up</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
