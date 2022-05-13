import { scope } from "@ioc:Adonis/Lucid/Orm"

export const search = (columns: string[]) => {
    scope((query, search: string) => {
        for (const index in columns) {
            const column = columns[index];
            console.log(column)
            // if (Number(index) < 1) {
            //     query.where(column, "LIKE", `%${search}%`);
            // } else {
            //     query.orWhere(column, "LIKE", `%${search}%`);
            // }
        }
    })
}