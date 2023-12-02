const doc = await Bun.file("2023/02/input.txt").text();

const findGame = /Game (\d+): /
const findCount = /(\d+) (.+)/

type Colour = "red" | "green" | "blue";

const items = doc.split("\n").reduce((total, item) => {
    const game = findGame.exec(item)!

    const powers = {
        red: 0,
        green: 0,
        blue: 0,
    }

    item.substring(game[0].length).split("; ").forEach((currentValue) => {
        currentValue.split(", ").forEach((val) => {
            const [, num, type] = findCount.exec(val)!;
            powers[type as Colour] = Math.max(powers[type as Colour], Number(num))
        })
    })

    return total + (powers.red * powers.green * powers.blue);
}, 0)

console.log(items)
