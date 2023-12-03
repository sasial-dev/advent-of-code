const doc = await Bun.file("2023/03/input.txt").text();

const isSeperator = /(\d+)/g;
const getGears = /(\*)/g;
const rows = doc.split("\n")

const numberToIndexList = (initialIndex: number, value: string) => new Array(value.length).fill(undefined).map((_, i) => initialIndex + i);

const numbers = Object.fromEntries(rows.flatMap((row, rowIndex) => Array.from(row.matchAll(isSeperator)).map((value) => ({ value: Number(value[0]), index: numberToIndexList(value.index!, value[0]), row: rowIndex }))).map((val, id) => [id, val]))

const totalCount = rows.reduce((total, row, rowNum) => {
    const countInRow = Array.from(row.matchAll(getGears)!).reduce((count, item) => {
        const matches = new Set<string>()

        for (const x of [-1, 0, 1]) {
            for (const y of [-1, 0, 1]) {
                for (const [id, number] of Object.entries(numbers)) {
                    if (number.index.includes(item.index! + x) && number.row === rowNum + y) {
                        matches.add(id)
                    }
                } 
            }
        }
        
        const matchesArray = Array.from(matches).map((key) => numbers[key].value)

        if (matchesArray.length === 2) return count + (matchesArray[0] * matchesArray[1])

        return count;
    }, 0);

    return total + countInRow;
}, 0)

console.log(totalCount)
