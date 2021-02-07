import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config';

const main = async () => {
    const orm = await MikroORM.init(microConfig); //返回一个promise

    // const post = new Post('my first post')
    const post = orm.em.create(Post, { title: 'my first post' });
    // 将post插入database
    await orm.em.persistAndFlush(post);
    await orm.em.nativeInsert(Post, { title: 'my first post 2' });
};

main();
