import Footer from "@/components/Home/Footer"
import { Toaster } from "@/components/ui/toaster"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Finvest",
    template: `%s | Finvest`,
  },
  description: "Finvest: Emerge Financially Fulfilled.",
  keywords: ["financial education", "pots", "invest together"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
          <Toaster />
          <Footer />
        </main>
      </body>
    </html>
  )
}
