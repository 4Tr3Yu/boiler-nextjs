export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-950 to-black">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-purple-950/20"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-sm text-purple-200/60 animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
