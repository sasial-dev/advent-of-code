const doc = await Bun.file("2023/01/input.txt").text();
const pattern = /(\d)/g;

const nums = doc.split("\n").reduce((total, currentVal) => {
    const result = currentVal.match(pattern)!;
    
    return total + (Number(result[0]) * 10) + Number(result.at(-1))
}, 0)

console.log(nums)
