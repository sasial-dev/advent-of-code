const doc = await Bun.file("2023/03/input.txt").text();

const isSeperator = /(\d+)/;
const getGears = /(\*)/g;
const rows = doc.split("\n")

const LINE_LENGTH = 10;

type Match = [value: number, row: number, index: number];

const leftMatch = (row: string, index: number, rowIndex: number): Match | undefined => {
    const leftMatch = row.at(index - 1)?.match(isSeperator)?.[0];
    if (leftMatch) {
        let num = leftMatch;
        let numIndex = -2;
        while (true) {
            const match2 = row.at(index + numIndex)?.match(isSeperator)?.[0];
            if (match2) {
                numIndex--;
                num = `${match2}${num}`
            } else {
                break
            }
        }
        return [Number(num), rowIndex, numIndex]
    }
}

const rightMatch = (row: string, index: number, rowIndex: number): Match | undefined => {
    const rightMatch = row.at(index + 1)?.match(isSeperator)?.[0];
    if (rightMatch) {
        let num = rightMatch;
        let numIndex = 2;
        while (true) {
            const match2 = row.at(index + numIndex)?.match(isSeperator)?.[0];
            if (match2) {
                numIndex++;
                num = `${num}${match2}`
            } else {
                break
            }
        }
        return [Number(num), rowIndex, numIndex]
    }
}

const totalCount = rows.reduce((total, row, rowNum, rows) => {
    const countInRow = Array.from(row.matchAll(getGears)!).reduce((count, item) => {
        const index = item.index!;
        let matches: Match[] = [];
        
        // check diagonals and up and down
        for (const y of [-1, 0, 1]) {
            const leftMatchFound = leftMatch(rows[rowNum + y], index, rowNum + y);
            if (leftMatchFound) matches.push(leftMatchFound);

            const left2MatchFound = rightMatch(rows[rowNum + y], index - 1, rowNum + y)
            if (left2MatchFound) matches.push(left2MatchFound)
            
            const rightMatchFound = rightMatch(rows[rowNum + y], index, rowNum + y)
            if (rightMatchFound) matches.push(rightMatchFound)

            const right2MatchFound = leftMatch(rows[rowNum + y], index + 1, rowNum + y)
            if (right2MatchFound) matches.push(right2MatchFound)
        }

        matches = matches
            .toSorted((a, b) => (a[1] * LINE_LENGTH + a[2]) - (b[1] * LINE_LENGTH + b[2]))
            .filter((v, i, arr) => {
                return v[1] === arr[i + 1]?.[1] ? (v[2] === arr[i+1][2] + 1 || v[2] === arr[i+1][2] - 1) : true
            })
            .filter((v, i, arr) => {
                return v[1] === arr[i - 1]?.[1] ? (v[2] === arr[i-1][2] + 1 || v[2] === arr[i-1][2] - 1) : true
            })
            .filter((v, i, arr) => {
                return v[1] === arr[i - 1]?.[1] ? v[0] < arr[i-1][0] : true
            })

        console.log(matches)

        // if (matches.length >= 2) return count + (matches[Math.floor((matches.length / 2) - .5)][0] * matches[Math.ceil((matches.length / 2) - .5)][0]);

        if (matches.length >= 2) return count + (matches[0][0] * matches[1][0])

        return count;
    }, 0);

    return total + countInRow;
}, 0)

console.log(totalCount)
