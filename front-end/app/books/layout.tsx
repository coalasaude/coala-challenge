import WHeader from '@/components/WHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <WHeader />
      {children}
    </section>
  );
}
