import { DataSource, EntitySchema } from 'typeorm'
import { stat } from 'fs/promises'
import { readdirSync } from 'fs'
import { join } from 'path'
import { Logger, Provider } from '@nestjs/common'

// On window 11 there is some bug with paths and "join(__dirname, '..', '/**/*.entity.js ')" does not load entity schemas
async function fetchAllEntities(srcPath: string, entities: EntitySchema[] = []) {
    const files = readdirSync(srcPath)

    for (const file of files) {
        const filePath = join(srcPath, file)
        const isDirectory = (await stat(filePath)).isDirectory()

        if (isDirectory) await fetchAllEntities(filePath, entities)
        if (file.endsWith('.entity.js')) entities.push(await import(filePath))
    }

    return entities.map((value: EntitySchema) => Object.values(value)[0])
}

export const databaseProvider: Provider[] = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                url: process.env.PG_URL,
                synchronize: true,
                entities: await fetchAllEntities(join(__dirname, '..')),
            })

            return await dataSource
                .initialize()
                .catch(() => Logger.error('An error occurred while connecting to the database', 'Database'))
        },
    },
]
