export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950 to-black">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      
      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center gap-8 px-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-purple-200/80 max-w-2xl">
            Your Next.js PWA Boilerplate
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="/login"
            className="px-8 py-4 bg-transparent hover:bg-purple-950/50 text-white rounded-lg font-semibold transition-all hover:scale-105 border-2 border-purple-950"
          >
            Get Started
          </a>
          <a
            href="/profile"
            className="px-8 py-4 bg-transparent hover:bg-purple-950/50 text-white rounded-lg font-semibold transition-all hover:scale-105 border-2 border-purple-950"
          >
            View Profile
          </a>
        </div>
      </main>
    </div>
  );
}

