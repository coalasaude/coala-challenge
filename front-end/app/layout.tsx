import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import { AuthProvider } from './contexts/auth-context';

export const metadata: Metadata = {
  title: 'Wormhole',
  description: 'Wormhole é o seu site de troca de livros',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeRegistry>
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
