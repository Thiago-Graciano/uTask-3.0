import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User.js";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "varchar", default: "todo" }) // todo, doing, done
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    // Relacionamento: Muitas tarefas para um usuário
    @ManyToOne(() => User)
    user: User;
}