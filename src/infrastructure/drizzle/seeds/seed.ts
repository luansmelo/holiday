import { seedHolidays } from "./holiday";
import { insertMunicipalities } from "./municipalities";
import { insertStates } from "./states";
import { client } from '../../../config/drizzle.config';

const main = async () => {
    const year = Number(process.env.CURRENT_YEAR);
    if (isNaN(year)) return;

    try {
        console.log("Iniciando inserção de estados e municípios...");

        await insertStates();
        await insertMunicipalities();
        await seedHolidays(year);

        console.log("Inserção de estados, municípios e feriados móveis concluída.");
    } catch (error) {
        console.error("Erro ao executar o seed:", error);
    } finally {
        // Encerra o pool de conexões após todas as operações
        await client.end();
        console.log("Conexão do pool encerrada.");
    }
};

main().catch(console.error);
