namespace SpriteKind {
    export const tile = SpriteKind.create()
    export const tail = SpriteKind.create()
}
function placeRandomLocation(target: Sprite) {
    target.setPosition(10 * randint(0, 9) + 10, 10 * randint(0, 9) + 10)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(dir == "d") && !(lastDir == "d")) {
        dir = "u"
    }
})
function newApple() {
    apple = sprites.create(img`
        4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 
        4 4 2 2 2 2 2 2 4 4 
        4 4 2 2 2 2 2 2 4 4 
        4 4 2 2 2 2 2 2 4 4 
        4 4 2 2 2 2 2 2 4 4 
        4 4 2 2 2 2 2 2 4 4 
        4 4 2 2 2 2 2 2 4 4 
        4 4 4 4 4 4 4 4 4 4 
        4 4 4 4 4 4 4 4 4 4 
        `, SpriteKind.Food)
    placeRandomLocation(apple)
    for (let checkedSprite of sprites.allOfKind(SpriteKind.tail)) {
        if (apple.overlapsWith(checkedSprite)) {
            sprites.destroy(apple)
            newApple()
        }
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(dir == "r") && !(lastDir == "r")) {
        dir = "l"
    }
})
function firstSpriteInArray(sprite: Sprite, list: Sprite[]) {
    return list.indexOf(sprite) == 0
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(dir == "l") && !(lastDir == "l")) {
        dir = "r"
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {

})
controller.menu.onEvent(ControllerButtonEvent.Repeated, function () {
    blockSettings.writeNumber("high", 0)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(dir == "u") && !(lastDir == "u")) {
        dir = "d"
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.play(music.createSoundEffect(
        WaveShape.Triangle,
        928,
        234,
        1000,
        200,
        50,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
    ), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    score += 1
    newApple()
})
controller.menu.onEvent(ControllerButtonEvent.Released, function () {
    music.stopAllSounds()
    if (!(blockSettings.readNumber("high") == 0)) {
        if (game.ask("Add To Leaderboard?", "A: Spacebar, B: Enter Key")) {
            addScore = blockSettings.readNumber("high")
            addName = game.askForString("Enter your initials!", 3)
            alphabetUppercaseList = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z"
            ]
            newCode = ""
            if (addName.length == 3) {
                for (let index = 0; index < 9; index++) {
                    newCode = "" + newCode + convertToText(Math.constrain(Math.round(Math.map(rng.randomRange(0, Math.sqrt(addScore) * 2.15), 0, addScore / 1.5, 0, 9)), 0, 9))
                }
                newCode = "" + newCode + convertToText(rng.randomRange(0, 0))
                newCode = "" + newCode + convertToText(rng.randomRange(0, 0))
                newCode = "" + newCode + convertToText(rng.randomRange(0, 0))
            }
            for (let index = 0; index < 4; index++) {
                newCode = "" + newCode + convertToText(Math.constrain(Math.round(Math.map(rng.randomRange(0, Math.sqrt(addScore) * 2.15), 0, addScore / 1.5, 0, 9)), 0, 9))
            }
            game.splash(newCode)
            rng.resetRNG()
        }
    }
})
function gameover() {
    music.stopAllSounds()
    if (score > blockSettings.readNumber("high")) {
        game.setGameOverEffect(false, effects.confetti)
        game.setGameOverMessage(false, "New High Score!")
        game.setGameOverPlayable(false, music.melodyPlayable(music.powerUp), false)
        blockSettings.writeNumber("high", score)
    }
    game.gameOver(false)
    game.setGameOverEffect(false, effects.none)
    game.setGameOverPlayable(false, music.melodyPlayable(music.powerDown), false)
    game.setGameOverMessage(false, "GAME OVER")
}
let snake: Sprite = null
let newCode = ""
let alphabetUppercaseList: string[] = []
let addName = ""
let addScore = 0
let apple: Sprite = null
let lastDir = ""
let score = 0
let dir = ""
let rng: FastRandomBlocks = null
rng = Random.createRNG(753648)
controller.configureRepeatEventDefaults(2000, 1000)
game.setGameOverEffect(false, effects.none)
game.setGameOverPlayable(false, music.melodyPlayable(music.powerDown), false)
if (!(blockSettings.exists("high"))) {
    blockSettings.writeNumber("high", 0)
}
let tileSprite = sprites.create(img`
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccbbccccccccb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    `, SpriteKind.tile)
tileSprite.left = 5
tileSprite.top = 5
let textSprite = textsprite.create("Score: 0")
let textSprite2 = textsprite.create("High: 0")
textSprite.left = 5
textSprite.bottom = 115
textSprite.z = 10
textSprite2.left = textSprite.right + 10
textSprite2.bottom = 115
textSprite2.z = 10
let head = sprites.create(img`
    6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 
    6 6 7 7 7 7 7 7 6 6 
    6 6 7 7 7 7 7 7 6 6 
    6 6 7 7 7 7 7 7 6 6 
    6 6 7 7 7 7 7 7 6 6 
    6 6 7 7 7 7 7 7 6 6 
    6 6 7 7 7 7 7 7 6 6 
    6 6 6 6 6 6 6 6 6 6 
    6 6 6 6 6 6 6 6 6 6 
    `, SpriteKind.Player)
head.z = 5
placeRandomLocation(head)
dir = "n"
let length = 3
score = 0
newApple()
music.play(music.createSong(hex`008c000408040106001c00010a006400f4016400000400000000000000000000000000000000029c0000000400012504000800012908000c0001240c001000012710001400012a14001800012718001c00012920002400012524002800012728002c0001252c003000012430003400012538003c0001223c004000012440004400012244004800012448004c00012550005400012458005c0001255c006000012260006400012764006800012a68006c00012970007400012578007c0001277c0080000129`), music.PlaybackMode.LoopingInBackground)
forever(function () {
    if (!(dir == "n")) {
        pause(75)
        lastDir = dir
        snake = sprites.create(img`
            6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 
            6 6 7 7 7 7 7 7 6 6 
            6 6 7 7 7 7 7 7 6 6 
            6 6 7 7 7 7 7 7 6 6 
            6 6 7 7 7 7 7 7 6 6 
            6 6 7 7 7 7 7 7 6 6 
            6 6 7 7 7 7 7 7 6 6 
            6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 
            `, SpriteKind.tail)
        snake.setPosition(head.x, head.y)
        snake.lifespan = score * 75 * 1.25
        if (dir == "u") {
            head.y += -10
        } else if (dir == "d") {
            head.y += 10
        } else if (dir == "l") {
            head.x += -10
        } else if (dir == "r") {
            head.x += 10
        }
        for (let checkedSprite of sprites.allOfKind(SpriteKind.tail)) {
            if (head.overlapsWith(checkedSprite)) {
                gameover()
            }
        }
    }
})
forever(function () {
    if (!(head.overlapsWith(tileSprite))) {
        gameover()
    }
})
forever(function () {
    textSprite.setText("Score: " + score)
    textSprite2.setText("High: " + blockSettings.readNumber("high"))
})
