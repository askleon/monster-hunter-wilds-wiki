import Image from "next/image";

export default function About() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg">
          This is the about page of our Next.js application.
        </p>
        {/* You can add more content here */}
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* You can keep the same footer as the home page or customize it */}
      </footer>
    </div>
  );
}