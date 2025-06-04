import React from "react";

function Upgrade() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid gap-10 md:grid-cols-2">
        {/* Pro Plan */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Pro <span className="sr-only">Plan</span>
            </h2>
            <p className="text-4xl font-extrabold text-blue-600 mb-4">
              <span className="text-gray-500 text-lg align-top">Rs.</span>3000
              <span className="text-gray-400 text-base font-medium">
                {" "}
                / month
              </span>
            </p>

            <ul className="space-y-3 text-gray-600">
              {[
                "20 users included",
                "5GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#"
            className="mt-8 block w-full rounded-full bg-red-700 text-white text-center py-3 font-semibold hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          >
            Get Started
          </a>
        </div>

        {/* Starter Plan */}
        <div className="bg-white rounded-3xl border border-gray-300 p-8 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Starter <span className="sr-only">Plan</span>
            </h2>
            <p className="text-4xl font-extrabold text-gray-800 mb-4">
              <span className="text-gray-500 text-lg align-top">Rs.</span>2000
              <span className="text-gray-400 text-base font-medium">
                {" "}
                / month
              </span>
            </p>

            <ul className="space-y-3 text-gray-600">
              {[
                "10 users included",
                "2GB of storage",
                "Email support",
                "Help center access",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#"
            className="mt-8 block w-full rounded-full border border-gray-800 bg-white text-gray-800 text-center py-3 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
