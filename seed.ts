import { Photon } from "@generated/photon";

// import { data } from "./MEDICARE_CHARGE_INPATIENT_DRGALL_DRG_Summary_FY2017/state_data"
const photon = new Photon();

const data = [];
// A `main` function so that we can use async/await
export async function main() {
  // Seed the database with users and posts
  data.forEach(async rec => {
    console.log(rec.procedure);
    return;
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
