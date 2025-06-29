'use client';

import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useForm } from '@formspree/react';

interface ContactBoxProps {
    formId: string;
    className?: string;
    title?: string;
}

export default function ContactBox({
    formId,
    className = '',
    title = 'Contact Us'
}: ContactBoxProps) {
    const [state, handleSubmit] = useForm(formId);

    return (
        <div className={`w-full ${className}`}>
            <div
                className="w-full p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-md border border-white/30"
                style={{ backgroundColor: 'rgba(106, 239, 230, 0.86)' }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="block text-base sm:text-lg font-medium text-gray-800 flex items-center">
                            <User className="h-3 w-5 mr-2 text-gray-700" />
                            Name
                        </label>
                        <input
                            name="name"
                            required
                            placeholder="Your name"
                            className="w-full box-border px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="block text-base sm:text-lg font-medium text-gray-800 flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-gray-700" />
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full box-border px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label className="block text-base sm:text-lg font-medium text-gray-800 flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2 text-gray-700" />
                            Message
                        </label>
                        <textarea
                            name="message"
                            rows={5}
                            required
                            placeholder="Your message..."
                            className="w-full box-border px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-auto"
                        />
                    </div>

                    {/* Submit Button - Simplified without spinner */}
                    <button
                        type="submit"
                        disabled={state.submitting || state.succeeded}
                        className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center backdrop-blur-md border border-white/30 ${state.submitting || state.succeeded
                                ? 'cursor-not-allowed'
                                : 'hover:bg-[#5ed9d1]'
                            }`}
                        style={{
                            backgroundColor: state.succeeded
                                ? 'rgba(34, 197, 94, 0.8)'
                                : 'rgba(106, 239, 230, 0.86)',
                        }}
                    >
                        {state.submitting ? (
                            "Sending..."
                        ) : state.succeeded ? (
                            <>
                                <CheckCircle className="h-5 w-5 mr-2" />
                                Message Sent!
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5 mr-2" />
                                Send
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}