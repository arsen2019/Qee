module.exports = {
    content: [
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        "./pages/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        "./public/**/*.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}