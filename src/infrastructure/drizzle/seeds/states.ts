import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { db } from "../../../config/drizzle.config";
import { states as statesTable } from "../../../domain/entities/schema";

dotenv.config();

export const insertStates = async () => {
    const statesData = fs.readFileSync(path.resolve(__dirname, 'states.csv'), 'utf8');
    const lines = statesData.trim().split('\n');
    const dataLines = lines.slice(1);
    const states = dataLines.map(line => {
        const [stateCode, stateName] = line.split(',');
        return { ibge_code: parseInt(stateCode), name: stateName.trim() };
    });

    await db.insert(statesTable).values(states);
    console.log(`Inserção de estados concluída.`);
};
