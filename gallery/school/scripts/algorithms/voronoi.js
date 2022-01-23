class VoronoiController extends AlgorithmController {
	constructor () {
		super();
		this.info.visible = false;
		this.info.shortName = 'Voronoi';
		this.info.name = 'Voronoi Diagram';
		this.info.infolink = 'https://en.wikipedia.org/wiki/Voronoi_diagram';
		this.algorithm = new Voronoi( );
		const that = this;
		/*this.steps = [
			{
				title: '...',
				explanation: '...',
				displayFunction: function() { that.algorithm.draw() }
			}
		];*/
		this.inputs = [
			{
				minStep: 0,
				type: 'range',
				label: 'Radius',
				initValue: 30,
				callback: function(ev) { that.algorithm.setRadius(ev.target.value) },
				min: 0,
				max: 100
			}
		];
	}

	draw () {
		this.algorithm.draw();
	}
}



class Voronoi extends Algorithm {
	constructor ( ) {
		super();
		this.cells = [ ];
		this.t = .3;
		makePoissonDistribution(100, C * .1).forEach(v => {
			this.cells.push( new VoronoiCell(v) );
		});
	}

	setRadius (t) {
		this.t = t * .01;
	}

	draw () {
		this.cells.forEach(p => {
			p.updateRadius( this.t );
			p.aaa( this.cells );
			p.display();
		});
	}
}


// This program borrows heavily from https://www.khanacademy.org/computer-programming/building-a-voronoi-diagram/5209320543617024
class VoronoiCell {
	constructor (position) {
		this.position = position;
		this.dim = 1;
		this.potantialRadius = C * .3;
		this.shape = { lines: [], arcs:[] };
	}

	get radius() {
		return this.dim * .5;
	}

	updateRadius (t) {
		this.dim = t * this.potantialRadius;
	}

	display () {
		setColor(45, .30, STROKE, POINT);
		point(this.position.x, this.position.y);
		setColor(45, .10, STROKE, LINE);
		circle(this.position.x, this.position.y, this.dim);
		this.drawBubble();
	}

	aaa (others) {
		const newIntersections = [];
		others.forEach(other => {
			if (this.isTouching(other)) {
				const points = getIntersectionBetweenCircles(this.position, this.radius, other.position, other.radius);
				newIntersections.push(points);
			}
		});
		this.shape = this.intersections2Shape(newIntersections);
	}

	drawBubble () {
		const d = 0;
		setColor(300, .2, STROKE, LINE);
		this.shape['lines'].forEach(l => {
			l.display();
		});
		setColor(180, .4, STROKE, LINE);
		this.shape['arcs'].forEach(a => {
			arc( this.position.x, this.position.y, this.dim, this.dim, a[0] - d, a[1] - d );
		});
	}

	intersections2Shape (intersections) {
		var res = { lines: [], arcs:[] };
		intersections.forEach(intersection => {
			res.lines.push(new Line(intersection[0], intersection[1]));
		});
		for (let i = 0; i < intersections.length; i++) {
			const j = i == intersections.length-1 ? 0 : i+1;

			const a1 = getAngleFromPoint(this.position, res['lines'][j].end );//res['lines'][i].end 
			const a2 = getAngleFromPoint(this.position, res['lines'][i].init);//res['lines'][j].init

			res.arcs.push([a1, a2]);
		}
		return res
	}

	isTouching (other) {
		const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
		var res = d < ( this.dim + other.dim ) * .5 && d > 0;
		if (res && this.shape.lines.length > 0) {
			var ddd = [ ];
			this.shape.lines.forEach(intersection => {
				if ( intersectionPt(
					this.position.x,
					other.position.x,
					intersection.init.x,
					intersection.end.x,
					this.position.y,
					other.position.y,
					intersection.init.y,
					intersection.end.y
				) ) { ddd.push( round( intersection.init.x ) ) };
			});
			other.shape.lines.forEach(intersection => {
				if ( intersectionPt(
					this.position.x,
					other.position.x,
					intersection.init.x,
					intersection.end.x,
					this.position.y,
					other.position.y,
					intersection.init.y,
					intersection.end.y
				) ) res = ddd.includes( round( intersection.init.x ) ) || ddd.includes( round( intersection.end.x ) );
			});
		}
		return res;
	}
}



class Line {
	constructor (init, end) {
		this.init = init;
		this.end = end;
	}
	display () {
		line(this.init.x, this.init.y, this.end.x, this.end.y);
	}
}

class Arc {
	constructor (init, end) {
		this.init = init;
		this.end = end;
	}
	display () {
		line(this.init.x, this.init.y, this.end.x, this.end.y);
	}
}





function getIntersectionBetweenCircles ( pos1, radius1, pos2, radius2 ) {
	const intersections = [ createVector(-10, -10), createVector(-10, -10)];

	const dx = pos2.x - pos1.x;
	const dy = pos2.y - pos1.y;
	const d2 = dx * dx + dy * dy;
	const di = sqrt(d2);
	const r2 = radius1 * radius1;
	const R2 = radius2 * radius2;
	
	if (di < radius1 + radius2 && di > abs(radius1 - radius2)) {
		const K = r2 - R2 + d2;
		const K2 = K * K;
		const h = sqrt(4 * r2 * d2 - K2);
		const c = 1 / (2 * d2);
		intersections[0].x = pos1.x + (dx * K + dy * h) * c;
		intersections[1].x = pos1.x + (dx * K - dy * h) * c;
		intersections[0].y = pos1.y + (dy * K - dx * h) * c;
		intersections[1].y = pos1.y + (dy * K + dx * h) * c;
	}
	return intersections;
}

function getAngleFromPoint(center, point) {
	const b = center.x - point.x;
	const h = center.y - point.y;

	var alpha = PI + atan(h/b);
	if (center.x < point.x) alpha += PI;

	return alpha;
}

function makePoissonDistribution( numberOfNodes, distanceBetweenNodes ) {
	nodes = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const node = createVector(0, 0);
		var aviablePosition = false;
		while ( !aviablePosition ) {
			node.x = random( 0, width);
			node.y = random( 0, height);
			aviablePosition = true;
			nodes.forEach(other => {
				const d = dist( other.x, other.y, node.x, node.y );
				if ( d < distanceBetweenNodes ) aviablePosition = false;
			});
		}
		nodes.push( node );
	}
	return nodes;
}

//Code heavily taken from Example Code and Explanations by Paul Bourke at http://paulbourke.net/geometry/pointlineplane/
//
//Function to test for intersections between line segments:
function intersectionPt(x1,x2,x3,x4,y1,y2,y3,y4){
  
	var uA,uB;
  var den,numA,numB;
  var intx, inty;

  den  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
  numA = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
  numB = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
  
  //Coincident? - If true, displays intersection in center of line segment
   if (abs(numA) == 0 && abs(numB) == 0 && abs(den) == 0) {
      intx = (x1 + x2) / 2;
      inty = (y1 + y2) / 2;
      return(true);
   }

   //Parallel? - No intersection
   if (abs(den) == 0) {
      intx = 0;
      inty = 0;
      return(false);
   }

   //Intersection?
   uA = numA / den;
   uB = numB / den;
  
   //If both lie w/in the range of 0 to 1 then the intersection point is within both line segments.
   if (uA < 0 || uA > 1 || uB < 0 || uB > 1) {
      intx = 0;
      inty = 0;
      return(false);
   }
   intx = x1 + uA * (x2 - x1);
   inty = y1 + uA * (y2 - y1);
   return(true);
}
