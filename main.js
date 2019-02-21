var data = [];
var m1 = 0;
var b1 = 0;
var m2 = 0;
var b2 = 0;

function setup()
{
	createCanvas(900, 500);
}	

function gradientDescent()
{
	var learning_rate = 0.05;

	for (var i = 0 ; i < data.length ; i++)
	{
		var guess = data[i].x * m2 + b2;
		var error = data[i].y - guess;

		m2 = m2 + (error * data[i].x)*learning_rate;
		b2 = b2 + error * learning_rate;
	}
}

function linearRegression()
{
	var sumX = 0;
	var sumY = 0;

	for (var i = 0 ; i < data.length ; i++)
	{
		sumX += data[i].x;
		sumY += data[i].y;
	}

	var xmean = sumX / data.length;
	var ymean = sumY / data.length;

	var nom = 0;
	var den = 0;

	for (var i = 0 ; i < data.length ; i++)
	{
		nom += (data[i].x - xmean) * (data[i].y - ymean);
		den += (data[i].x - xmean) * (data[i].x - xmean); 
	}

	m1 = nom / den;
	b1 = ymean - m1 * xmean;
}

function drawLine1()
{
	var x1 = 0;
	var x2 = 1;
	var y1 = m1 * x1 + b1;
	var y2 = m1 * x2 + b1;
	
	x1 = map(x1, 0, 1, 0, 400);
	x2 = map(x2, 0, 1, 0, 400);
	y1 = map(y1, 0, 1, 400, 0);
	y2 = map(y2, 0, 1, 400, 0);

	stroke(0, 0, 128);
	line(x1, y1, x2, y2);
}

function drawLine2()
{
	var x1 = 0;
	var x2 = 1;
	var y1 = m2 * x1 + b2;
	var y2 = m2 * x2 + b2;
	
	x1 = map(x1, 0, 1, 500, 900);
	x2 = map(x2, 0, 1, 500, 900);
	y1 = map(y1, 0, 1, 400, 0);
	y2 = map(y2, 0, 1, 400, 0);

	stroke(0, 0, 128);
	line(x1, y1, x2, y2);
}

function draw()
{
	background(255);
	fill(51);
	rect(0, 0, 400, 400);
	rect(500, 0, 400, 400);
	fill(255);
	stroke(255);
	for (var i = 0 ; i < data.length; i++)
	{
		var x1 = map(data[i].x, 0, 1, 0, 400);
		var y1 = map(data[i].y, 0, 1, 400, 0);
		var x2 = map(data[i].x, 0, 1, 500, 900);
		var y2 = map(data[i].y, 0, 1, 400, 0);
		ellipse(x1, y1, 8, 8);
		ellipse(x2, y2, 8, 8);
	}

	if (data.length > 1)
	{
		linearRegression();
		drawLine1();
		gradientDescent();
		drawLine2();
	}
	fill(0);
	textSize(18);
	text("m = "+m1.toFixed(5), 30, 420);
	text("b = "+b1.toFixed(5), 260, 420);
	text("m = "+m2.toFixed(5), 530, 420);
	text("b = "+b2.toFixed(5), 760, 420);
	text("Ordinary Least Squares", 100, 450);
	text("Gradient Descent", 630, 450);

}

function mouseClicked()
{
	if(mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 400)
	{
		var x = map(mouseX, 0, 400, 0, 1);
		var y = map(mouseY, 0, 400, 1, 0);

		var point = createVector(x, y);
		data.push(point);
	}

	if(mouseX > 500 && mouseX < 900 && mouseY > 0 && mouseY < 400)
	{
		var x = map(mouseX, 500, 900, 0, 1);
		var y = map(mouseY, 0, 400, 1, 0);

		var point = createVector(x, y);
		data.push(point);
	}
	
}