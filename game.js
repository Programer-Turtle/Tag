var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var counter = 0;
var lost = false;

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

function CheckIfLost()
{
    if (Enemy.x == apple.x && Enemy.y == apple.y)
    {
        lost = true
        context.clearRect(0, 0, canvas.width, canvas.height);
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
    context.fillStyle = 'lime';
    MoveEnemy()
    context.fillRect(Enemy.x, Enemy.y, grid, grid);
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid, grid);
    DrawWalls()
    CheckIfLost()
    points = points+1
    pointdisp.innerText = points;
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
GenerateWallCords(10)