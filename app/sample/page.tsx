import Link from "next/link";

export default function SamplePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Sample Wiki Page</h1>
      <p className="text-lg">
        This is a sample wiki page. You can add your content here.
      </p>
      <h2 className="text-2xl font-semibold">Section 1</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae
        tincidunt nisl nunc euismod nunc.
      </p>
      <h2 className="text-2xl font-semibold">Section 2</h2>
      <p>
        Phasellus auctor, magna a pulvinar tincidunt, augue augue tincidunt
        augue, nec tincidunt nisl nunc euismod nunc.
      </p>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
