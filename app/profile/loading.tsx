export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <div className="h-9 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-5 w-96 bg-muted animate-pulse rounded"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          {/* Profile form skeleton */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
            <div className="space-y-3">
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>
          </div>

          {/* Email form skeleton */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
            <div className="space-y-3">
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>
          </div>

          {/* Password form skeleton */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="h-6 w-36 bg-muted animate-pulse rounded"></div>
            <div className="space-y-3">
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
