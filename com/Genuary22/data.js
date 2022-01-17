const artworks = [
	{ day: 1, prompt: "Draw 10.000 of something", title: "Tri * 10^4", info: "<p>The color hue of each triangle is the result of multiplying the col by the row.</p><p>It was a happy accident and visually awful, but I found interesting enough for keeping.</p>" },
	{ day: 3, prompt: "Space", title: "Cosmic rain", info: "<p>Circles moving downwards at a random speed each. Simple.</p>" },
	{ day: 4, prompt: "The next next Fidenza", title: "TranspDenza", info: "<p>Inspired in <em>The Next Fidenza</em>, but with high transparency lines.</p>" },
	{ day: 5, prompt: "Destroy a square", title: "Dequare", info: "<p>Points initially positioned making a square shape, and moved by a flow field generated by <em>perlin noise</em>.</p>" },
	{ day: 6, prompt: "Trade styles with a friend", title: "Ondulacions geogràfiques", info: "<p>Simple <em>flow fields</em>. The colors and the rest of parameters chosen by my brother.</p>" },
	{ day: 7, prompt: "Sol LeWitt Wall Drawing", title: "Metatron Joining", info: "<p>Inspired by <a href=\"https://www.artnet.com/galleries/krakow-witkin-gallery/one-wall-one-work-sol-lewitt-1\">One Wall, One Work | Sol LeWitt, Wall Drawing #815, March 1997</a>.</p><p>Sightly irregular concentric polygons where each vertex is joined to every vertex.</p>" },
	{ day: 8, prompt: "Single curve only", title: "Bezier", info: "<p>Bezier curve visual implementation.</p>" },
	{ day: 9, prompt: "Architecture", title: "Domes", info: "<p>Recursive mirrored trees</p>" },
	{ day: 10, prompt: "Machine learning, wrong answers only", title: "Machine copying human", info: "<p>Machine copying human.</p><p>The left side draws the mouse path while the right side copies the left one rotated and with certain delay.</p>" },
	{ day: 11, prompt: "No computer", title: "", info: "<p>This used to be my favorite toy when I was a child.</p>" },
	{ day: 12, prompt: "Packing (squares, circles, any shape...)", title: "Suns", info: "<p>Circles with a random number of triangles surrounding them and a little circle in each triangle.</p><p>The colors are HSL and the hue comes from perlin noise.</p><p>Not really packing but I still like the result.</p>" },
	{ day: 13, prompt: "800x80", title: "Bracelet", info: "<p>Random generated patterns.</p>" },
	{ day: 14, prompt: "Something you'd never make", title: "Circle", info: "<p>Quite common, but I had never done it.</p><p>The colors are the ones of my bedroom's walls ^^</p>" },
	{ day: 15, prompt: "Sand", title: "The Golden Pool", info: "<p>Random particles moved by a flow field generated by <em>perlin noise</em>.</p><p>The background are squares with random gradient.</p>" },
	{ day: 16, prompt: "Color gradients gone wrong", title: "", info: "<p>Just a happy accident.</p><p>It happens while I was making the artwork of day one. I tried to multiply the <code>i</code> times the <code>j</code> in a pixel grid, and the resultant hue color was this strange pattern.</p><p>I don't understand it, but I love it.</p>" },
	{ day: 17, prompt: "3 colors", title: "CMY in orbits", info: "<p>Orbits in orbits.</p><p>There are three planets orbiting the same sun. Each planet has a moon whose trajectory keeps drawn in the artwork. The radius of the orbits and its speed is random, but all the planets and all the moons need to have the same speed between them.</p>" },
	{ day: 18, prompt: "VHS", title: "Broken CMY", info: "<p>Crazy lack of ideas, I'm too young for VHS nostalgia.</p><p>Anyway, I programmed a random stripes of random gradients with a random grid of yellow, magenta and cyan squares above.</p><p>Pretty proud.</p>" },
];