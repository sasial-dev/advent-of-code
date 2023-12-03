const doc = await Bun.file("2023/03/input.txt").text();

const isSeperator = /([^.0-9\s])/;
const getDigits = /(\d+)/g;
const rows = doc.split("\n")

const totalCount = rows.reduce((total, row, rowNum, rows) => {
    const countInRow = Array.from(row.matchAll(getDigits)!).reduce((count, item) => {
        const index = item.index!;
        const itemNumber = Number(item[0])

        // check left and right
        if (row.at(index - 1)?.match(isSeperator)?.[0]) return count + itemNumber;
        if (row.at(index + item[0].length)?.match(isSeperator)?.[0]) return count + itemNumber;

        // check diagonals and up and down
        for (let i = -1; i < (item[0].length + 1); i++) {
            const step = index + i;
            
            if (rows[rowNum - 1]?.at(step)?.match(isSeperator)?.[0]) return count + itemNumber;
            if (rows[rowNum + 1]?.at(step)?.match(isSeperator)?.[0]) return count + itemNumber;
        }

        return count;
    }, 0);

    return total + countInRow;
}, 0)

console.log(totalCount)
