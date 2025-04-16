tailwind.config = {
    theme:{
        extend:{

            gridTemplatesColumns:{
                'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
            },
            fontFamily: {
                Outfit:["Outfit", "sans-serif"],
                Ovo:["Ovo", "serif"]
            },
            animation:{
                spin_slow:'spin 6s linear infinite'
            },
            keyframes: {
                spin: {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' }
                }
            },
            colors:{
                lightHover: '#fcf4ff',
                darkHover: '#2a004a',
                darkTheme: '#11001F'
            },
            boxShadow:{
                'black': '4px 4px 0 #000',
                'White': '4px 4px 0 #fff',
            }
        }
    },
    darkMode:'selector'
}