// Generated by Xata Codegen 0.29.4. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "Players",
    columns: [{ name: "name", type: "string", unique: true }],
    revLinks: [
      { column: "player1", table: "Teams" },
      { column: "player2", table: "Teams" },
    ],
  },
  {
    name: "Teams",
    columns: [
      {
        name: "player1",
        type: "link",
        link: { table: "Players" },
        unique: true,
      },
      {
        name: "player2",
        type: "link",
        link: { table: "Players" },
        unique: true,
      },
    ],
    revLinks: [{ column: "team", table: "Team_Games" }],
  },
  {
    name: "Team_Games",
    columns: [
      { name: "team", type: "link", link: { table: "Teams" } },
      { name: "game", type: "link", link: { table: "TeamGames" } },
      { name: "wins", type: "int", notNull: true, defaultValue: "0" },
    ],
  },
  {
    name: "TeamGames",
    columns: [],
    revLinks: [{ column: "game", table: "Team_Games" }],
  },
  {
    name: "IndividualGames",
    columns: [],
    revLinks: [{ column: "game", table: "Individual_Games" }],
  },
  {
    name: "Individual_Games",
    columns: [
      { name: "player", type: "string" },
      { name: "game", type: "link", link: { table: "IndividualGames" } },
      { name: "time", type: "float" },
    ],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://kapplouis-s-workspace-tnvj9h.eu-central-1.xata.sh/db/olympiade",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
