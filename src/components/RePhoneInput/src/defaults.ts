import type { CountryItem } from "./types";

const builtInCountries: Array<CountryItem> = [
  {
    country: "中国",
    perfix: "+86",
    validator: (phoneNumber: string) => {
      return /^1[3-9]\d{9}$/.test(phoneNumber);
    }
  },
  {
    country: "英国",
    perfix: "+44",
    validator: (phoneNumber: string) => {
      return /^((7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{4})$/.test(phoneNumber);
    }
  },
  {
    country: "韩国",
    perfix: "+82",
    validator: (phoneNumber: string) => {
      return /^01(?:0|1|[6-9])\d{8}$/.test(phoneNumber);
    }
  },
  {
    country: "日本",
    perfix: "+81",
    validator: (phoneNumber: string) => {
      return /\A0[5-9]0[-(]?\d{4}[-)]?\d{4}\z/.test(phoneNumber);
    }
  }
];

export default builtInCountries;
