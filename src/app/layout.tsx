import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UrbanLens | Smart City Dashboard',
  description: 'Intelligent city search and atmospheric dashboard powered by AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-white text-foreground selection:bg-primary/20">
        {children}
      </body>
    </html>
  );
}
