import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tight">
              ContextKit
            </Link>
            <nav className="flex items-center gap-4 text-sm text-zinc-400">
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
              <Link href="/dashboard/api-keys" className="hover:text-white">
                API Keys
              </Link>
            </nav>
          </div>
          <UserButton />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>
    </div>
  );
}
