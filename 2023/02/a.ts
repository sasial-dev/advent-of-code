const doc = await Bun.file("2023/02/input.txt").text();

const findGame = /Game (\d+): /
const findCount = /(\d+) (.+)/

const totals = {
    red: 12,
    green: 13,
    blue: 14
}

type Colour = "red" | "green" | "blue";

const items = doc.split("\n").reduce((total, item) => {
    const game = findGame.exec(item)!

    const subGames = item.substring(game[0].length).split("; ").every((currentValue) => {
        const count = currentValue.split(", ")

        for (const val of count) {
            const [, num, type] = findCount.exec(val)!;
            if (Number(num) > totals[type as Colour]) {
                return false;
            }
        }

        return true;
    })


    console.log(game[1], subGames)
    return subGames ? total + Number(game[1]) : total
}, 0)

console.log(items)
