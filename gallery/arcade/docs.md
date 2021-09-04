# Arcade

<style> n { color: #0080ff; font-family: "Segoe Print" } </style>

<small>Visit: https://markralovna.github.io/gallery/arcade/</small>

A teacher of mine told the best way to learn game development is copying games.

## Estètica

<n>CMY</n>

## Arquitectura

### <n>Resum</n>

* <n>Aquest projecte té 3 capes bàsiques:</n>
    * <n>**La interfície**: és la capa que mostra els controls i outputs dels jocs de manera igual per a tots ells. Aquesta capa està formada per:</n>
        * `index.html`
        * `styles/*`
        * `view.js`
        * `sketch.js`
    * <n>**La definició de joc** (`scripts/games/Game.js`): és la interfície que defineix els atributs i mètodes de les classes dels jocs i els seus controladors.</n>
    * <n>**El joc** (`scripts/games/Game.js:Game`): són les classes que contenen la informació del joc corresponent, dels seus controls, els inputs i tot el que necessita.</n>
    * <n>**El controlador** (`scripts/games/Game.js:GameController`): són els controladors de cada joc.</n>
        * <n>Cada controlador contés els mètodes...</n>
            * <n>`setup`: ...</n>
            * <n>`draw`: conté la lògica de cada iteració. Usualment crida l'`update` i el `display`.</n>
            * <n>`display`: dibuixa els gràfics que calgui</n>
            * <n>`update`: actualitza totes les variables</n>
            * <n>`starGame`: ...</n>
            * <n>`gameover`: ...</n>
* <n>...</n>

## Jocs

* El joc de la serp
* El pescamines

# ToDos

* Possibles jocs:
    * [ ] 3 Ratlla
    * [ ] Solitario?
    * [ ] Sudoku
    * [ ] Pintar color?
    * [ ] Tetris
