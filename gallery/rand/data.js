const artworks = {
	perlin_mirrored: {
		title: "Mirrored Noise",
		date: 1643918400,
		parms: [
			{ key: "base_color_hue", min: 60, max: 300 },
			{ key: "num_paths", min: .01 * window.innerWidth, max: .1 * window.innerWidth },
			{ key: "num_mirror", min: 6, max: 64 },
			{ key: "noise_scale", min: 50, max: 500 } 
		],
		info: ""
	},
	forest: {
		title: "Magic Forest",
		date: 1644595200,
		parms: [
			{ key: "space_beween_trees", min: 5, max: 500 },
			{ key: "angle", min: .1, max: 6.28 },
			{ key: "lenght_multiplier", min: 1, max: 5 },
			{ key: "noise_scale", min: 50, max: 500 }
		],
		info: ""
	},
	concentric: {
		title: "Concentric circles Pattern",
		date: 1644602400,
		parms: [
			{ key: "base_color_hue", min: 40, max: 320 },
			{ key: "cell_size", min: 60, max: 300 },
			{ key: "concentric_ratio", min: 1, max: 10 },
			{ key: "random_difficulty", min: 1, max: 10 },
			{ key: "circle_cells", min: 1, max: 5 } 
		],
		info: ""
	},
	bezier: {
		title: "Orbiting bezier",
		date: 1645214400,
		parms: [
			{ key: "base_color_hue", min: 60, max: 300 },
			{ key: "noise_increment_divider", min: 10, max: 1000 } 
		],
		info: ""
	},
	cave: {
		title: "Cave",
		date: 1645909200,
		parms: [
			{ key: "base_color_hue", min: 60, max: 300 },
			{ key: "stroke_weight", min: 1, max: 2 },
			{ key: "dx_quotient", min: 100, max: 300 },
			{ key: "noise_factor", min: 100, max: 300 },
			{ key: "count", min: 3, max: 12 } 
		],
		info: ""
	},
	perlin_spiral_bezier: {
		title: "Perlin Spiral Bezier",
		date: 1646602200,
		parms: [
			{ key: "base_color_hue", min: 60, max: 300 },
			{ key: "noise_factor", min: 100, max: 300 },
			{ key: "polygon_vertices", min: 128, max: 2048 },
			{ key: "anchor_angle_increment", min: 0, max: 1.5 },
			{ key: "bezier_vertices", min: 3, max: 9 },
		],
		info: ""
	},
	organized_dots: {
		title: "Organized Dots",
		date: 1647462600,
		parms: [
			{ key: "n_factor", min: 2, max: 5 },
			{ key: "layers", min: 3, max: 16 },
			{ key: "dr", min: 1, max: 5 } 
		],
		info: ""
	},
	jellyfishes: {
		title: "Jellyfishes",
		date: 1647783000,
		parms: [
			{ key: "number_jellyfish", min: 5, max: 15 },
			{ key: "displacement_noise", min: 1, max: 2 },
			{ key: "noise_scale", min: 100, max: 600 } 
		],
		info: ""
	},
	cricled_cave: {
		title: "Cave rotated",
		date: 1651003200,
		parms: [
			{ key: "base_color_hue", min: 60, max: 300 },
			{ key: "noise_factor", min: 50, max: 1000 },
			{ key: "line_count", min: 128, max: 2048 },
			{ key: "circle_count", min: 1, max: 16 } 
		],
		info: ""
	},
	poli: {
		title: "Poli",
		date: 1650279600,
		parms: [
			{ key: "layers", min: 2, max: 6, step: 1 },
			{ key: "polygon_sides", min: 3, max: 12, step: 1 },
			{ key: "polygon_size_ratio", min: 5, max: 15, step: 1 },
			{ key: "layers_radius_ratio", min: 1, max: 2, step: .01 } 
		],
		info: ""
	},
	mountains: {
		title: "Mountains",
		date: 1649545200,
		parms: [
			{ key: "base_color_hue", min: 60, max: 300 },
			{ key: "noise_factor", min: 50, max: 1000 },
			{ key: "moutain_resolution", min: 2, max: 15 },
			{ key: "moutain_size_ratio", min: 1, max: 15 },
			{ key: "number_mountains", min: 2, max: 15 } 
		],
		info: ""
	},
	patterns: {
		title: "Patterns",
		date: 1650283200,
		parms: [
			{ key: "layers", min: 2, max: 6, step: 1 },
			{ key: "nodes", min: 3, max: 12, step: 1 },
			{ key: "size_ratio", min: 5, max: 15, step: 1 },
			{ key: "layers_radius_ratio", min: 1, max: 2, step: .01 } 
		],
		info: ""
	},
	lines: {
		title: "Manta",
		date: 1650751200,
		parms: [
			{ key: "stroke_weight", min: .5, max: 3, step: .1 },
			{ key: "distance", min: 1, max: 10, step: 1 },
			{ key: "noise_scale", min: 50, max: 1000, step: 1 },
			{ key: "perp_line_length", min: 5, max: 300, step: 1 },
			{ key: "num_paths", min: 2, max: 20, step: 1 } 
		],
		info: ""
	},
	grid: {
		title: "Patterns",
		date: 1650837600,
		parms: [
			{ key: "grid_cells", min: 1, max: 3, step: 12 },
			{ key: "base_color", min: 0, max: 360, step: 12 } 
		],
		info: ""
	},
	iris: {
		title: "Iris",
		date: 1652047200,
		parms: [
			{ key: "noise_scale", min: 1, max: 16, step: 1 },
			{ key: "base_color_hue", min: 30, max: 330 },
			{ key: "nodes", min: 3, max: 128, step: 1 },
			{ key: "resolution", min: 1, max: 24, step: 1 } 
		],
		info: ""
	} 
};
