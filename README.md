# Punt i Còpia — web demo

Web bilingüe (CA/ES) para una copistería, estudio de fotografía e imprenta de barrio, diseñada por [She's Digital](https://sheisdigitalab.com). Punt i Còpia es un negocio ficticio: los datos de contacto y la dirección son de ejemplo.

🌐 **Demo en vivo:** https://sheisdigitalab.github.io/punt-i-copia-web/

## Stack
- HTML estático + CSS vanilla + JS vanilla
- Google Fonts: Fraunces (display), Geist (body), JetBrains Mono (mono)
- Sin frameworks ni build step

## Estructura
```
.
├── index.html         Inici
├── serveis.html       Catàleg de serveis
├── nosaltres.html     Sobre nosaltres
├── contacte.html      Contacte, mapa, formulari
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/
```

## Características
- Bilingüe CA/ES con toggle persistente en localStorage
- Mobile-first responsive (375 / 768 / 1280+)
- Botón WhatsApp flotante con mensaje pre-rellenado por idioma
- Mapa de Google embebido en contacto
- Paleta CMYK (cian · magenta · amarillo · negro), también en el logo
- Tipografía editorial cálida con cursivas expresivas

## Desplegar localmente
```bash
python -m http.server 5180
# luego abre http://localhost:5180
```
