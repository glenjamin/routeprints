import axios from "axios";

export type Athlete = {
  id: number;
};

const SECOND = 1000;
const stravaApiClient = axios.create({
  baseURL: "/strava/api",
  timeout: 10 * SECOND
});

export function getAthlete(): Promise<Athlete> {
  return stravaApiClient.get("/athlete").then(({ data }) => ({
    id: data.id
  }));
}
