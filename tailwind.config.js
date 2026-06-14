/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kratos: {
          // Backgrounds
          bg:        '#F5F4EF',
          bg2:       '#EEECE5',
          panel:     '#FFFFFF',
          'panel-2': '#FAFAF7',
          // Borders
          border:    '#E5E3DC',
          'border-2':'#CFCCC3',
          // Text
          ink:       '#0F0E0C',
          text:      '#1A1714',
          subtle:    '#4A453F',
          muted:     '#6E685F',
          // Brand
          red:       '#B91C1C',
          'red-2':   '#991B1B',
          'red-soft':'#FEF2F2',
          // Semantic
          ok:        '#047857',
          'ok-soft': '#ECFDF5',
          warn:      '#B45309',
          'warn-soft':'#FFFBEB',
          danger:    '#B91C1C',
          'danger-soft':'#FEF2F2',
          info:      '#1E3A8A',
          'info-soft':'#EFF6FF',
          plum:      '#6D28D9',
          'plum-soft':'#F5F3FF'
        }
      },
      fontFamily: {
        sans:    ['Rubik', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Josefin Sans"', 'Rubik', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        soft:  '0 1px 2px rgba(15,14,12,0.04)',
        panel: '0 1px 2px rgba(15,14,12,0.04), 0 4px 16px -6px rgba(15,14,12,0.05)',
        lift:  '0 4px 14px -4px rgba(15,14,12,0.09), 0 1px 2px rgba(15,14,12,0.04)'
      }
    }
  },
  plugins: []
}
