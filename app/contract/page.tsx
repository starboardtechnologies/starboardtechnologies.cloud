'use client';

export default function ContractPage() {
  return (
    <main className="min-h-[200vh] bg-black px-6 py-20 text-white">
      <div className="h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-fluid-hero font-bebas text-pinks-razzledazzlerose">
            CONTRACT
          </h1>
          <p className="text-3xl md:text-4xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
            3 month
          </p>
          <p className="text-3xl md:text-4xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
            6 month
          </p>
          <p className="text-3xl md:text-4xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
            12 month
          </p>
          <p className="text-3xl md:text-4xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
            Custom Timeframe
          </p>
        </div>
      </div>

      {/* Fixed image at bottom */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 bg-black/80 py-4">
        <img
          src="/images/st_logo.png"
          alt="Starboard Technologies Logo"
          className="h-12 md:h-16 w-auto"
        />
      </div>
    </main>
  );
}