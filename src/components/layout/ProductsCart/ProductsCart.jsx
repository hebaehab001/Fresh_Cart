import React from 'react'

export default function ProductsCart() {
  return (
    <div className="flex items-start bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg transition duration-300 transform hover:scale-[1.01] cursor-pointer">
      {/* 1. Icon / Placeholder Area */}
      <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg mr-4 md:mr-6 flex items-center justify-center">
        {/* Render custom icon or a simple placeholder SVG if none is provided */}
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L15 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-5 4h1m-1-4h1m-1-4h1"
            />
          </svg>
        )}
      </div>

      {/* 2. Text Content Area */}
      <div className="grow min-w-0">
        {/* Headline */}
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{headline}</h2>

        {/* Body Text - Uses font-mono to match the image's style */}
        <p className="text-xs md:text-sm text-gray-600 font-mono whitespace-pre-line leading-relaxed">
          {content}
        </p>
      </div>

      {/* 3. Action Button */}
      {/* ml-4 applies margin, self-center vertically aligns the button */}
      <div className="ml-4 shrink-0 self-center">
        <button
          onClick={onButtonClick}
          className="bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
