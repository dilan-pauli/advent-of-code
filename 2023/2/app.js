const VALID_RED_CUBES = 12;
const VALID_GREEN_CUBES = 13;
const VALID_BLUE_CUBES = 14;

const fs = require('fs');
const readline = require('readline');

// Returns the id of the line if the line is winnable given the const input
function IdOfWinnableGame(line) {
    var splitGame = line.trim().split(":");
    var gameID = splitGame[0].slice(4).trim();
    var game = splitGame[1].trim();
    var gameViews = game.split('; ');

    for (i = 0; i < gameViews.length; i++) {
        var gameMap = {
            blue: 0,
            green: 0,
            red: 0
        };

        var cubeSets = gameViews[i].split(', ')
        cubeSets.forEach(cubeSet => {
            var num = cubeSet.split(' ')[0].trim();
            var color = cubeSet.split(' ')[1].trim();
            gameMap[color] = num;
        });

        if (gameMap['blue'] > VALID_BLUE_CUBES ||
            gameMap['green'] > VALID_GREEN_CUBES ||
            gameMap['red'] > VALID_RED_CUBES) {

            gameID = 0;
            break;
        }
    }

    return gameID;
}

async function processLineByLine(fileName) {
    const fileStream = fs.createReadStream(fileName);
    var answer = 0;
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        answer += Number(IdOfWinnableGame(line))
    }

    return answer;
}

var args = process.argv.slice(2);
if (args.length != 1) {
    process.stderr.write("Requires one argument.");
    process.exit(1);
}

processLineByLine(args[0]).then(result => {
    process.stdout.write(`${result}\n`)
});