const Firebird = require("node-firebird")

const options = {

    host:
        process.env.DB_HOST,

    port:
        Number(process.env.DB_PORT),

    database:
        process.env.DB_DATABASE,

    user:
        process.env.DB_USER,

    password:
        process.env.DB_PASSWORD,

    lowercase_keys: false,

    role: null,

    pageSize: 4096,
}

export function connectDatabase(): Promise<any> {

    return new Promise((resolve, reject) => {

        Firebird.attach(
            options,

            (
                err: Error | null,
                db: any
            ) => {

                if (err) {

                    reject(err)

                    return
                }

                resolve(db)
            }
        )
    })
}