# Magic Drawing

<style> n { color: #0080ff; font-family: "Segoe Print" } </style>

<small>Visit: https://markralovna.github.io/gallery/draw/</small>

Appweb per dibuixar coses relaxants. L'usuari hauria d'obtenir un dibuix "resultón" sense esforç.

M'agradaria que hi hagués tres llenços i que cada un manipuli el traç de l'usuari de manera diferent. Cada llenç està vinculat a una forma.

## Estètica

Els tres llenços tindran la mateixa paleta cromàtica per mantenir una coherència comuna, però les formes seran diferents per a cada un per mantenir la singularitat de cada un.

* **Fons**: `#1F1F1F`
* **Text**: `#F8F8F8AA`
* **Elements**:
	* Saturació: 80%, Brillantor: 25%, Transparència: 80%
	* Tons CMYk → 45, 180, 315

## <n>Artwork</n>

### Symetrical Drawing (Round)

El programa dibuixa punts al punt de la pantalla on l'usuari dibuixa i el replica de manera fractal.

Els dibuixos resultats semblen mandales i tendeixen a tenir forma arrodonida.

A través de la interfície gràfica, el programa permet:

* Inputs:
	* Seleccionar el nombre de simetries
	* Seleccionar quant tarda a esborrar-se la traça
	* Modificar el gruix de la traça
* Botons:
	* Esborrar el llenç
	* Canviar el mode *
	* Tornar als valors per defecte dels rangs

\* El programa funciona de dues maneres:

1. Que a cada iteració del `draw` es dibuixi un punt on hi hagi el cursor.
2. Que a cada iteració del `draw` es dibuixi una línia al punt on hi hagi el cursor i el punt anterior.

### Grid Drawing (Square)

El programa consisteix en una graella on l'usuari pot marcar una casella i aquesta passarà a ser vermella. Per què vermella? No importa, el color anirà canviant.

A través de la interfície gràfica, el programa permet:

* Inputs:
	* Ajustar la mida de les caselles
	* <n>...</n>
	* <n>...</n>
* Botons:
	* Netejar el llenç
	* <n>...</n>
	* <n>...</n>

### Pyramid Drawing (Triangle)

<n>S'ha de fer tot l'artwork</n>

<n>Potser seria una bona ocasió per fer quelcom tipus el que havia de ser el projecte `gallery\mouse`?</n>

<n>xxxx</n>
