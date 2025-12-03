//import custom components
import Header from "@/components/common/Header";

type Props = {
  children: React.ReactNode;
};

export default function TodoLayout({ children }: Props) {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>;
    </div>
  );
}
