import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sanskrit: ['Playfair Display', 'serif'],
				devnagari: ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				spiritual: {
					saffron: '#FF9933', // Indian flag saffron
					white: '#FFFFFF',   // Indian flag white
					green: '#138808',   // Indian flag green
					gold: '#D4AF37',
					cream: '#FDF5E6',
					brown: '#8B4513',
					sand: '#F5DEB3',
					sage: '#BCB88A',
					maroon: '#800000',  // Traditional Indian color
					turmeric: '#FFC72C', // Turmeric yellow
					peacock: '#324851', // Peacock blue-green
					lotus: '#FE6B9E',   // Lotus pink
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.6'
					}
				},
				'chakra-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'chakra-spin': 'chakra-spin 10s linear infinite'
			},
			backgroundImage: {
				'spiritual-gradient': 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,153,51,0.2))',
				'gold-gradient': 'linear-gradient(135deg, #FFC72C 0%, #FDF5E6 100%)',
				'mandala-pattern': 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3")'
			},
			perspective: {
				none: 'none',
				'500': '500px',
				'1000': '1000px',
				'2000': '2000px',
			},
			transformStyle: {
				'3d': 'preserve-3d',
				'flat': 'flat',
			},
			rotate: {
				'-2': '-2deg',
				'-1': '-1deg',
				'1': '1deg',
				'2': '2deg',
				'3': '3deg',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities, theme }) {
			const perspectiveUtilities = Object.entries(theme('perspective') || {}).reduce(
				(acc, [key, value]) => ({
					...acc,
					[`.perspective-${key}`]: { perspective: value },
				}),
				{}
			);
			
			const transformStyleUtilities = Object.entries(theme('transformStyle') || {}).reduce(
				(acc, [key, value]) => ({
					...acc,
					[`.transform-style-${key}`]: { 'transform-style': value },
				}),
				{}
			);
			
			addUtilities(perspectiveUtilities);
			addUtilities(transformStyleUtilities);
		}
	],
} satisfies Config;
