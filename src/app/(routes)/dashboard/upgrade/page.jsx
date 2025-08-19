import React from "react";

function Upgrade() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Choose Your Plan</h1>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
        {/* Pro Plan */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Pro Plan</h2>
          <p className="text-2xl font-bold text-red-600 mb-4">Rs. 3000 / month</p>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li>- 20 users</li>
            <li>- 5GB storage</li>
            <li>- Email support</li>
          </ul>
          <button className="w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-500">
            Get Started
          </button>
        </div>

        {/* Starter Plan */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2">Starter Plan</h2>
          <p className="text-2xl font-bold text-gray-800 mb-4">Rs. 2000 / month</p>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li>- 10 users</li>
            <li>- 2GB storage</li>
            <li>- Email support</li>
          </ul>
          <button className="w-full py-2 border border-red-700 text-gray-800 rounded-lg font-medium hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
