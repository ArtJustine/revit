export default function Loading() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A6A6] mx-auto"></div>
          <p className="mt-4 text-[#666666]">Loading job details...</p>
        </div>
      </div>
    )
  }
  