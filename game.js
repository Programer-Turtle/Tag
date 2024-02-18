var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var counter = 0;
var lost = false;
var WallAmount = 30

function SetRandomIcon()
{
    const icons = ["LogoBlue.png", "LogoGreen.png", "LogoRed.png"]
    const randomIndex = Math.floor(Math.random() * icons.length);
    document.getElementById("Logo").href = "Photos/" + icons[randomIndex]
}

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
}

var grid = 16;
const pointdisp = document.getElementById("points")
var points = 0;
var apple = {
    x: 0,
    y: 0
  };

var Enemy = {
    x: 16,
    y: 192
};

var runner = 
{
    x: 192,
    y: 192
}

var walls = []

function abosluteValue(number)
{
    if (number < 0)
    {
        return number * -1
    }
    else
    {
        return number
    }
}

function DrawWalls()
{
    context.fillStyle = 'blue';
    for (var index = 0; index < walls.length;)
    {
        var wall = walls[index]
        context.fillRect(wall[0], wall[1], grid, grid);
        index = index+1
    } 
}

function GenerateWallCords(amount)
{
    walls = []
    for (var index = 0; index < amount;)
    {
        var generatedcord = [getRandomInt(0, 25) * grid ,getRandomInt(0, 25) * grid]
        let found = walls.some(arr => arr[0] === generatedcord[0] && arr[1] === generatedcord[1]);
        let AtORigin = walls.some(arr => arr[0] === 0 && arr[1] === 0);
        if (!found || !AtORigin)
        {
            walls.push(generatedcord)
            index = index+1
        }
    }

}

function AllowedToBeAtSpot(x, y)
{
    let found = walls.some(arr => arr[0] === x && arr[1] === y);
    if(!found)
    {
        return true
    }
    else
    {
        return false
    }
}

function MoveEnemy()
{
    if(counter >= 1)
    {
        return
    }
    else
    {
        points = points+1
        pointdisp.innerText = points;
    }

    //move y
    if (apple.y === Enemy.y || abosluteValue(apple.y - Enemy.y) === grid && abosluteValue(apple.x - Enemy.x) > 1*grid)
    {
        Enemy.y = Enemy.y
    }
    else if (apple.y > Enemy.y)
    {
        Enemy.y = Enemy.y + grid
    }
    else if (apple.y < Enemy.y)
    {
        Enemy.y = Enemy.y - grid
    }

    //move x
    if (apple.x === Enemy.x || abosluteValue(apple.x - Enemy.x) === grid && abosluteValue(apple.y - Enemy.y) > 1*grid)
    {
        Enemy.x = Enemy.x
    }
    else if (apple.x > Enemy.x)
    {
        Enemy.x = Enemy.x + grid
    }
    else if (apple.x < Enemy.x)
    {
        Enemy.x = Enemy.x - grid
    }
}

function MoveRunner()
{
    //Xposistion
    var XPosistions = [runner.x, runner.x + grid, runner.x - grid]
    var Xdifferences = []
    var targetx = 0

    //Checks if died
    if((runner.y === apple.y) && (runner.x === apple.x))
    {
        points = points + 100
        pointdisp.innerText = points;
        runner.y  = getRandomInt(0, 25) * grid
        runner.x  = getRandomInt(0, 25) * grid
    }

    //Distance Required
    YDisntance = abosluteValue(apple.x - runner.x)
    XDisntance = abosluteValue(apple.y - runner.y)
    if (XDisntance >= (4 * grid) && YDisntance >= (4 * grid) || XDisntance <= (1 * grid) && YDisntance <= (1 * grid))
    {
        return
    }

    var IndexToRemoveX = []
    //Removes Invalid Moves
    for (var is = 0; is < XPosistions.length; is++)
    {
        if((XPosistions[is] <= -16 || XPosistions[is] >= 400) || (!AllowedToBeAtSpot(XPosistions[is], runner.y)))
        {
            IndexToRemoveX.push(is)
        }
    }

    for (var i = 1; i <= IndexToRemoveX.length; i++)
    {
        XPosistions.splice(IndexToRemoveX[IndexToRemoveX.length - i],1)
    }

    //Get Distances
    for (var index = 0; index < XPosistions.length; index++)
    {
        Xdifferences.push(abosluteValue(apple.x - XPosistions[index]))
    }

    //Gets Largest Difference
    var largest = Xdifferences[0];

    for (var i = 0; i < Xdifferences.length; i++) 
    {
        if (Xdifferences[i] > largest ) 
        {
            largest = Xdifferences[i];
        }
    }
    targetx = XPosistions[Xdifferences.indexOf(largest)]

    console.log(XPosistions)
    console.log(targetx)
    //Chnages Posistion
    runner.x = targetx

    //Yposistion
    var YPosistions = [runner.y, runner.y + grid, runner.y - grid]
    var Ydifferences = []
    var targetY = 0

    //Removes Invalid Moves
    var IndexToRemoveY = []
    for (var is = 0; is < YPosistions.length; is++)
    {
        if(YPosistions[is] <= -16 || YPosistions[is] >= 400 || !AllowedToBeAtSpot(runner.x, YPosistions[is]))
        {
            IndexToRemoveY.push(is)
        }
    }

    for (var i = 1; i <= IndexToRemoveY.length; i++)
    {
        YPosistions.splice(IndexToRemoveY[IndexToRemoveY.length - i],1)
    }

    //Get Distances
    for (var index = 0; index < YPosistions.length; index++)
    {
        Ydifferences.push(abosluteValue(apple.y - YPosistions[index]))
    }

    //Gets Largest Difference
    var largest = Ydifferences[0];

    for (var i = 0; i < Ydifferences.length; i++) 
    {
        if (Ydifferences[i] > largest ) 
        {
            largest = Ydifferences[i];
        }
    }
    targetY = YPosistions[Ydifferences.indexOf(largest)]

    //Chnages Posistion
    runner.y = targetY
}

function Restart()
{
    apple.x = 0
    apple.y = 0
    Enemy.x = 16
    Enemy.y = 192
    points = 0
    GenerateWallCords(WallAmount)
    pointdisp.innerText = points;
    lost = false
}

function CheckIfLost()
{
    if (Enemy.x == apple.x && Enemy.y == apple.y)
    {
        lost = true
        context.clearRect(0, 0, canvas.width, canvas.height);
        Restart()
    }
}

function Draw()
{
    counter = counter + 1
    if (counter === 3)
    {
        counter = 0
    }
    //Clears Screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Draws

    //Walls
    DrawWalls()

    //Enemy
    MoveEnemy()
    context.fillStyle = 'lime';
    context.fillRect(Enemy.x, Enemy.y, grid, grid);

    //Runner
    MoveRunner()
    context.fillStyle = 'orange';
    context.fillRect(runner.x, runner.y, grid, grid);

    //Apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid, grid);
    CheckIfLost()
}

document.addEventListener('keydown', function(e) {
    // prevent snake from backtracking on itself by checking that it's 
    // not already moving on the same axis (pressing left while moving
    // left won't do anything, and pressing right while moving left
    // shouldn't let you collide with your own body)
    
    // left arrow key
    if (lost == false)
    {
        if (e.which === 37 && apple.x !== 0) {
          if (AllowedToBeAtSpot(apple.x - grid, apple.y))
          {
            apple.x = apple.x - grid;
          }
          Draw()
        }
        else if (e.which === 38 && apple.y !== 0) {
          if(AllowedToBeAtSpot(apple.x, apple.y - grid))
          {
            apple.y = apple.y - grid
          }
          Draw()
        // right arrow key
        }
        else if (e.which === 39 && apple.x !== 384) {
          if (AllowedToBeAtSpot(apple.x + grid, apple.y))
          {
            apple.x = apple.x + grid
          }
          Draw()
        }
        else if (e.which === 40 && apple.y !== 384) {
          if (AllowedToBeAtSpot(apple.x, apple.y + grid) == true)
          {
            apple.y = apple.y + grid
          }
          Draw()
        }
    }
  });

  var i = setInterval(function(){
    if (lost == false)
    {
        Draw()
    }
}, 150);

SetRandomIcon()
GenerateWallCords(WallAmount)