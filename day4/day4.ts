import { readLines } from "../util/files";

const input = readLines("./day4/day4_input.txt");

interface Passport {
  byr: string; // birth year - four digits between 1920 and 2002
  iyr: string; // issue year - four digits between 2010 and 2020
  eyr: string; // expiration year - four digits between 2020 and 2030
  hgt: string; // height - either 150-193cm or 59-76in
  hcl: string; // hair color - a # followed by exactly six characters 0-9 or a-f
  ecl: string; // eye color - exactly one of: amb, blu, brn, gry, grn, hzl or oth
  pid: string; // passport id - nine-digit number, including leading zeroes
  cid?: string; // country id - ignored, missing or not
}

const isPassport = (obj: any): obj is Passport => {
  const schema: Passport = {
    byr: "",
    iyr: "",
    eyr: "",
    hgt: "",
    hcl: "",
    ecl: "",
    pid: "",
  };
  const missingKeys = Object.getOwnPropertyNames(schema).filter(
    (key) => !Object.getOwnPropertyNames(obj).includes(key)
  );
  return missingKeys.length === 0;
};

const validateProperties = (passport: Passport): boolean => {
  return (
    validateDigit(passport.byr, 1920, 2002) &&
    validateDigit(passport.iyr, 2010, 2020) &&
    validateDigit(passport.eyr, 2020, 2030) &&
    validateHeight(passport.hgt) &&
    validateHexColor(passport.hcl) &&
    validateEyeColor(passport.ecl) &&
    validatePassportID(passport.pid)
  );
};

const validateDigit = (
  digit: string,
  lower_bound: number,
  upper_bound: number
): boolean => {
  return +digit >= lower_bound && +digit <= upper_bound;
};

const validateHeight = (height: string): boolean => {
  if (height.includes("cm")) {
    const cm = +height.replace("cm", "");
    return cm >= 150 && cm <= 193;
  } else if (height.includes("in")) {
    const inches = +height.replace("in", "");
    return inches >= 59 && inches <= 76;
  }
  return false;
};

const validateHexColor = (hex: string): boolean => {
  return hex.match(/^#[a-f0-9]{6}$/i) !== null;
};

const validateEyeColor = (color: string): boolean => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(color);
};

const validatePassportID = (id: string): boolean => {
  return id.match(/^[0-9]{9}$/) !== null;
};

const numberOfValids = (passports: Object[], validate: boolean): number => {
  let valid = passports.filter((passport) => isPassport(passport));
  return validate
    ? valid.filter((validPassports) =>
        validateProperties(validPassports as Passport)
      ).length
    : valid.length;
};

const parsePassports = (lines: string[]): Object[] => {
  let passports: Object[] = [];
  let passportLines: string[] = [];

  lines.map((line) =>
    line.split(" ").forEach((value) => passportLines.push(value))
  );

  let current = {};
  for (let i = 0; i < passportLines.length; i++) {
    if (passportLines[i] === "") {
      passports.push(current);
      current = {};
    } else {
      const pair = passportLines[i].split(":");
      current[pair[0]] = pair[1];
    }
  }
  return passports;
};

const parsed = parsePassports(input);
console.log(`Part 1 has ${numberOfValids(parsed, false)} valid passports`);
console.log(`Part 2 has ${numberOfValids(parsed, true)} valid passports`);
