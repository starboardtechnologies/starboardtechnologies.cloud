// app/contract/layout.tsx

export const metadata = {
  title: 'starboardtechnologies.cloud/about',
  description: 'Learn more about Starboard Technologies and what we do.',
};

export default function RnDLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      style={{ backgroundColor: '#2c2c2c', minHeight: '100vh' }}
      className="p-6 text-white font-bebas"
    >
      {children}
    </section>
  );
}

