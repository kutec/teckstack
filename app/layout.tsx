// app/layout.tsx
import SkipLink from '@/components/SkipLink';
import './globals.scss';
import '@/styles/post-content.css';
import Header from '@/components/Header';

export const metadata = {
    title: 'TeckStack – Smarter Tech Learning',
    description: 'Frontend, ReactJS, JavaScript & DSA simplified for modern developers.',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-white text-gray-900">
                {/* Skip link for keyboard users */}
                <SkipLink />
                <Header />
                <main id="main">{children}</main>
            </body>
        </html>
    );
}
