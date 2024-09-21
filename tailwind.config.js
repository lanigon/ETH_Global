/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',   // 检测 pages 文件夹中的文件
    './components/**/*.{js,ts,jsx,tsx}',  // 检测 components 文件夹中的文件
    './src/**/*.{js,ts,jsx,tsx}',  // 检测 src 文件夹中的文件
    './app/**/*.{js,ts,jsx,tsx}',  // 检测 app 文件夹中的文件（如果存在）
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
