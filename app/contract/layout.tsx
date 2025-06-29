// app/contact/layout.tsx

export const metadata = {
    title: 'starboardtechnologies.cloud/contract',
    description: 'Learn more about Starboard Technologies and what we do.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen bg-[#2c2c2c] p-6 text-white">
            {children}
        </section>
    );
}
