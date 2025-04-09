"use client"

const calculateEarnings = () => {
  // Use the same total as in the earnings page: $1,670.00
  return 1670
}

const Page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Earnings Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Earnings</h2>
        <p className="text-3xl font-bold text-green-500">${calculateEarnings().toFixed(2)}</p>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
        <div className="flex justify-between items-center">
          <span className="text-[#666666]">Completed Jobs</span>
          <span className="font-bold text-[#333333]">
            {8} {/* Match the 8 jobs from the earnings page */}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#666666]">Avg. Rating</span>
          <span className="font-bold text-[#333333]">4.8</span>
        </div>
      </div>

      {/* Recent Activity (Example) */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <p>No recent activity to display.</p>
      </div>
    </div>
  )
}

export default Page
