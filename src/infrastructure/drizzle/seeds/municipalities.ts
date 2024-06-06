import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { db } from "../../../config/drizzle.config";
import { municipalities as municipalitiesTable } from "../../../domain/entities/schema";

dotenv.config();

export const insertMunicipalities = async () => {
    const municipalitiesData = fs.readFileSync(path.resolve(__dirname, 'municipalities-2019.csv'), 'utf8');
    const lines = municipalitiesData.split('\n');

    const dataLines = lines.slice(1);
    const municipalities = dataLines.map(line => {
        const [municipality_code, name] = line.split(',');
        return { ibge_code: parseInt(municipality_code), name: name.trim(), state_code: parseInt(municipality_code.substring(0, 2)) };
    });
    
    await db.insert(municipalitiesTable).values(municipalities);
    console.log(`Inserção de municípios concluída.`);
};
