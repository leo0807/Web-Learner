import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";


@ObjectType() //判断 graphql 返回给用户的类型  
//表名 users
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  email: string;

  @Column("text")
  password: string;

    // 当创建了一个refresh token 给予一个当前token的版本
  @Column("int", { default: 0 })
  tokenVersion: number;
}
