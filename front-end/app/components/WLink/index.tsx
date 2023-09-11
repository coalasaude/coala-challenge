import Link from 'next/link';

import * as styles from './styles';

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function WLink({ href, children }: Props) {
  return (
    <Link href={href} style={styles.container}>
      {children}
    </Link>
  );
}
