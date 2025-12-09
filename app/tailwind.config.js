/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

module.exports = {
    content: [
        "./app/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#eef8ff",
                    500: "#2563eb", // sample blue
                }
            }
        },
        plugins: [
            typography,
        ]
    },
};