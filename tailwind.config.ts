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
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				float: {
					"0%, 100%": { transform: "translateY(0) translateX(0)" },
					"25%": { transform: "translateY(-20px) translateX(10px)" },
					"50%": { transform: "translateY(-35px) translateX(-10px)" },
					"75%": { transform: "translateY(-20px) translateX(8px)" },
				},
				'month-transition': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'20%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'80%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'100%': {
						opacity: '0',
						transform: 'scale(1.1)'
					}
				},
				'typewriter': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'blink': {
					'50%': { borderColor: 'transparent' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'digital-rain': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateY(100%)', opacity: '0' }
				},
				'text-glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(2px, -2px)' },
					'60%': { transform: 'translate(-2px, -2px)' },
					'80%': { transform: 'translate(2px, 2px)' },
					'100%': { transform: 'translate(0)' }
				},
				'number-cycle': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'10%, 90%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(-100%)', opacity: '0' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				},
				'network-pulse': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(2)', opacity: '0' }
				},
				'particle-fade': {
					'0%': { opacity: '0', transform: 'scale(0.8) rotate(0deg)' },
					'50%': { opacity: '0.5', transform: 'scale(1.2) rotate(180deg)' },
					'100%': { opacity: '0', transform: 'scale(0.8) rotate(360deg)' }
				},
				'truth-shift': {
					'0%': { filter: 'hue-rotate(0deg) brightness(1)' },
					'50%': { filter: 'hue-rotate(45deg) brightness(1.2)' },
					'100%': { filter: 'hue-rotate(0deg) brightness(1)' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.5', transform: 'scale(0.9)' },
				},
				'scroll': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				'gather': {
					'0%': { transform: 'translate(0, 0)' },
					'100%': { transform: 'translate(var(--gather-x, 50%), var(--gather-y, 50%))' },
				},
				'wave': {
					'0%, 100%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(2)' },
				},
				'rise': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'50%': { transform: 'translateY(50%)', opacity: '1' },
					'100%': { transform: 'translateY(0)', opacity: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out',
				'float': 'float 20s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'month-transition': 'month-transition 3s ease-in-out forwards',
				'typewriter': 'typewriter 2s steps(20) forwards',
				'cursor-blink': 'blink 1s infinite',
				'slide-left': 'slide-in-left 1.5s ease-out',
				'slide-right': 'slide-in-right 1.5s ease-out',
				'rain': 'digital-rain 2s linear infinite',
				'glitch': 'text-glitch 0.5s ease infinite',
				'cycle': 'number-cycle 0.5s ease-in-out',
				'transition-container': 'transition-container 3s ease-in-out forwards',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'scroll': 'scroll 20s linear infinite',
				'gather': 'gather 4s ease-in-out infinite alternate',
				'wave': 'wave 1s ease-in-out infinite',
				'rise': 'rise 3s ease-out infinite',
				'network-pulse': 'network-pulse 2s ease-out infinite',
				'particle-fade': 'particle-fade 2s ease-out infinite',
				'truth-shift': 'truth-shift 2s ease-out infinite',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
