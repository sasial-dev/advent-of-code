const wordToDigit = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
} as Record<string, number>;

const doc = await Bun.file("2023/01/input.txt").text();
const pattern = /(one|two|three|four|five|six|seven|eight|nine|\d)/;

const nums = doc.split("\n").reduce((total, currentVal) => {
    // i was *almost* there until "oneight" stumped me! I had to cheat a little on this line to find it as it wasn't in the calibration values :(
    const result = currentVal.split('').map((_, i) => currentVal.substring(i).match(pattern)?.[0]).filter((v) => !!v) as string[];
    
    const start = wordToDigit[result[0]] ?? Number(result[0])
    const end = wordToDigit[result.at(-1)!] ?? Number(result.at(-1)!)
    console.log(result[0], result.at(-1))

    return total + (start * 10) + end
}, 0)

console.log(nums)
