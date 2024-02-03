function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function binomialCoefficient(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function probability(n, r, randNum) {
  if (n < 1 || n > 8 || r < 1 || r > 4 || r > n || randNum < 0 || randNum > 4 - r)
    return "Invalid inputs";

  // inherit skills prob
  let inheritNumArr = [];
  let inheritNumProb = 0.0;
  if (n == r) {
    // r or better
    for (let i = r; i <= 4; i++) {
      let p = getInheritedNumberOfSkillsProbability(i);
      inheritNumProb += p;
      inheritNumArr.push(`<span class="var">${p}</span> <span class="smallnote">(${i} skills)</span>`);
    }
  }
  else {
    // exact number
    inheritNumProb = getInheritedNumberOfSkillsProbability(r);
    inheritNumArr.push(`<span class="var">${inheritNumProb}</span> <span class="smallnote">(${r} skills)</span>`);
  }

  // random skills prob
  let randomNumArr = [];
  let randomNumProb = 0.0;
  if (randNum > 0 && r + randNum == 4) {
    // max number
    for (let i = randNum; i <= 3; i++) {
      let p = getRandomNumberOfSkillsProbability(i, r);
      randomNumProb += p;
      randomNumArr.push(`<span class="var">${p}</span> <span class="smallnote">(${i} skills)</span>`);
    }
  }
  else {
    // exact number
    randomNumProb = getRandomNumberOfSkillsProbability(randNum, r);
    randomNumArr.push(`<span class="var">${randomNumProb}</span> <span class="smallnote">(${randNum} skills)</span>`);
  }

  // select combination of skills prob
  let combinationsNum = binomialCoefficient(n, r);
  let combinationProb = 1 / combinationsNum;

  let result = inheritNumProb * combinationProb * randomNumProb;
  let resultStr = `<span class="prob_big">${formatNumber(result * 100, 2)}%</span><br /><br /><br />`
    + `Chance to inherit <span class="var">${r}</span> skills: ${inheritNumArr.join(" + ")} = <span class="prob">${formatNumber(inheritNumProb, 2)}</span><br /><br />`
    + `Combination probability: <span class="var">1</span> / <span class="var">${combinationsNum}</span> = <span class="prob">${formatNumber(combinationProb, 2)}</span><br /><br />`
    + `Chance to get <span class="var">${randNum}</span> random skills: ${randomNumArr.join(", ")} = <span class="prob">${formatNumber(randomNumProb, 2)}</span>`;
  return resultStr;
}

function getInheritedNumberOfSkillsProbability(r) {
  switch (r) {
    case 1: return 0.4;
    case 2: return 0.3;
    case 3: return 0.2;
    case 4: return 0.1;
    default: return 0.0;
  }
}

function getRandomNumberOfSkillsProbability(randNum, r) {
  if (r == 4) return 1.0;

  switch (randNum) {
    case 0: return 0.4;
    case 1: return 0.3;
    case 2: return 0.2;
    case 3: return 0.1;
    default: return 0.0;
  }
}

function selectWeightedRandomIndex(weights) {
  let sum = weights.reduce((a, b) => a + b, 0);
  let rand = Math.random() * sum;
  for (let i = 0; i < weights.length; i++) {
    if (rand < weights[i]) {
      return i;
    }
    rand -= weights[i];
  }
  return -1;
}

function formatNumber(num, maxDecimals) {
  let multiplier = Math.pow(10, maxDecimals);
  return Math.round(num * multiplier) / multiplier;
}
