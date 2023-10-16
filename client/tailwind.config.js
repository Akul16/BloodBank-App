/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': "#8a0303",
            }
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    }
}