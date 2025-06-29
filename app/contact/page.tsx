'use client';

import ContactBox from '@/components/ContactBox';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="w-full max-w-[600px]">
                <ContactBox
                    formId="xblyqkde" // Replace with your actual Formspree ID
                    title="Contact"
                />
            </div>
        </div>
    );
}