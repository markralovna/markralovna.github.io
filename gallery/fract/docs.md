# The Symmetry

<style>n{color:#0080ff;font-family:"Segoe Print"}</style>

<small>Visit: https://markralovna.github.io/gallery/fract/</small>

## Descripció

Mandales animades que relaxin

## Descripció

La idea és crear un algoritme que generi mandales boniques i relaxants.

En una següent fase, es podria crear una interficie on l'usuari pugui crear les seves pròpies mandales.

## Estètica

Les regles d'estètica general:

* Fons:
	* Color: `12`
* Linies de les figures:
	* Color: `248`
	* Gruix: `2`

Estil:

L'estil del dibuix ha de ser de mandala. Per exemple:

![](referencies\01.jpg)

## Detalls tècnics

Per poder crear les mandales, s'han dissenyat diferents components. Cada component és una classe que implementa la classe `Component.js`.

### Estructura de fitxers:

```css
fract
├── js
│   ├── componentsMandala
│   │   ├── Component.js
│   │   └── ...
│   ├── p5.js
│   └── sketch.js
├── referencies
├── estils.css
├── index.html
└── README.MD
```

### Interfícies

<n>...</n>

### Programa principal

L'sketch principal no fa gaire feina. L'estructura és la següent:

* Declaració de constants i variables.
* `setup()`
	* <n>...</n>
* `draw()`
	* <n>...</n>

## Components

<n>...</n>

## <n>To Do</n>

### Interficie

* [ ] ARREGKAR ELS BUGS A L'HORA DE MOURE LES CAPES AMUNT I AVALL
* [ ] ARRGLAR EL PROMP PER AFEGIR CAPES
* [ ] ARREGLAR LES SCROLL BARS A FIREFOX
* [ ] ARREGLAR LA FUNCIÓ `./js/interface.js/key2component()`
* [ ] DOCUMENTTAR

### Futur

* [ ] AFEGIR UNA FUNCIÓ PER EXPORTAR MANDALES
	* [ ] PODER EXPORTAR A SVG???