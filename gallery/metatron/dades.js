const solids = {
	tetrahedron: {
		name: "Tetrahedron",
		element: "Fire",
		colorHue: 0,
		faces: 4,
		edges: 6,
		facePlygonEdges: 3,
		vertices: 4,
		metatronPoints: [ [0,2],[2,2],[4,2],[0,2],[0,0],[4,2],[2,2],[0,0] ]
	},
	cube: {
		name: "Cube",
		element: "Earth",
		colorHue: 110,
		faces: 6,
		edges: 12,
		facePlygonEdges: 4,
		vertices: 8,
		metatronPoints: [ [3,2],[4,2],[5,2],[0,0],[3,2],[2,2],[1,2],[0,2],[5,2],[0,0],[1,2] ],
		vertices3D: [ [0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1] ]
	},
	octahedron: {
		name: "Octahedron",
		element: "Air",
		colorHue: 280,
		faces: 8,
		edges: 12,
		facePlygonEdges: 3,
		vertices: 6,
		metatronPoints: [ [0,2],[2,2],[4,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,2] ]
	},
	dodecahedron: {
		name: "Dodecahedron",
		element: "",
		colorHue: 25,
		faces: 12,
		edges: 20,
		facePlygonEdges: 5,
		vertices: 20,
		metatronPoints: [ ]
	},
	icosahedron: {
		name: "Icosahedron",
		element: "Water",
		colorHue: 210,
		faces: 20,
		edges: 12,
		facePlygonEdges: 3,
		vertices: 12,
		metatronPoints: [ [0,2],[2,2],[4,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,2],[2,2],[3,1],[5,1],[1,1],[3,1] ]
	}
}