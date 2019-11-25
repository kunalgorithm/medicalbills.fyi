import { Prisma } from "./prisma/generated/prisma-client";

import data from "./MEDICARE_CHARGE_INPATIENT_DRGALL_DRG_Summary_FY2017/state_data.json";
const prisma = new Prisma();

// A `main` function so that we can use async/await
export async function main() {
  // Seed the database with users and posts
  // @ts-ignore
  data.forEach(async rec => {
    console.log(rec.procedure);
    return;
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {});
