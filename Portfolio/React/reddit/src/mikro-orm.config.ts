import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files  
    },
    entities: [Post], // database table
    dbName: 'lireddit',
    debug: !__prod__, //生产环境下不使用debug模式
    type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0]; //转化为 MikroORM.init 类型
