import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Wormhole',
  description: 'Wormhole é o seu site de troca de livros',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeRegistry>
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
