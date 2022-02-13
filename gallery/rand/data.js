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
			{ key: "base_color_hue", min: 60, max: 300 },
			{ key: "cell_size", min: 60, max: 300 },
			{ key: "concentric_ratio", min: 1, max: 10 },
			{ key: "random_difficulty", min: 1, max: 10 },
			{ key: "circle_cells", min: 1, max: 5 } 
		],
		info: ""
	} 
};
