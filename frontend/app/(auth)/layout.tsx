type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <main>{children}</main>;
}
