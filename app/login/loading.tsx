export default function LoginLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-purple-950/20"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
