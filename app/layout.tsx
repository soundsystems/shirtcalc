import './globals.css'

export const metadata = {
  title: 'MSA Screen-Print Pricing',
  description: 'Get a simple quote for your screen-printing order',
  icons: {icon: '/favicon.svg'},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
