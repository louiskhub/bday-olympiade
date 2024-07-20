import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "Players";
    readonly columns: readonly [
      {
        readonly name: "name";
        readonly type: "string";
        readonly unique: true;
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "player1";
        readonly table: "Teams";
      },
      {
        readonly column: "player2";
        readonly table: "Teams";
      }
    ];
  },
  {
    readonly name: "Teams";
    readonly columns: readonly [
      {
        readonly name: "player1";
        readonly type: "link";
        readonly link: {
          readonly table: "Players";
        };
        readonly unique: true;
      },
      {
        readonly name: "player2";
        readonly type: "link";
        readonly link: {
          readonly table: "Players";
        };
        readonly unique: true;
      }
    ];
    readonly revLinks: readonly [
      {
        readonly column: "team";
        readonly table: "Team_Games";
      }
    ];
  },
  {
    readonly name: "Team_Games";
    readonly columns: readonly [
      {
        readonly name: "team";
        readonly type: "link";
        readonly link: {
          readonly table: "Teams";
        };
      },
      {
        readonly name: "game";
        readonly type: "link";
        readonly link: {
          readonly table: "TeamGames";
        };
      },
      {
        readonly name: "wins";
        readonly type: "int";
        readonly notNull: true;
        readonly defaultValue: "0";
      }
    ];
  },
  {
    readonly name: "TeamGames";
    readonly columns: readonly [];
    readonly revLinks: readonly [
      {
        readonly column: "game";
        readonly table: "Team_Games";
      }
    ];
  },
  {
    readonly name: "IndividualGames";
    readonly columns: readonly [];
    readonly revLinks: readonly [
      {
        readonly column: "game";
        readonly table: "Individual_Games";
      }
    ];
  },
  {
    readonly name: "Individual_Games";
    readonly columns: readonly [
      {
        readonly name: "player";
        readonly type: "string";
      },
      {
        readonly name: "game";
        readonly type: "link";
        readonly link: {
          readonly table: "IndividualGames";
        };
      },
      {
        readonly name: "time";
        readonly type: "float";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Players = InferredTypes["Players"];
export type PlayersRecord = Players & XataRecord;
export type Teams = InferredTypes["Teams"];
export type TeamsRecord = Teams & XataRecord;
export type TeamGames = InferredTypes["Team_Games"];
export type TeamGamesRecord = TeamGames & XataRecord;
export type TeamGames = InferredTypes["TeamGames"];
export type TeamGamesRecord = TeamGames & XataRecord;
export type IndividualGames = InferredTypes["IndividualGames"];
export type IndividualGamesRecord = IndividualGames & XataRecord;
export type IndividualGames = InferredTypes["Individual_Games"];
export type IndividualGamesRecord = IndividualGames & XataRecord;
export type DatabaseSchema = {
  Players: PlayersRecord;
  Teams: TeamsRecord;
  Team_Games: TeamGamesRecord;
  TeamGames: TeamGamesRecord;
  IndividualGames: IndividualGamesRecord;
  Individual_Games: IndividualGamesRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
