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

    @Column({ type: "varchar", default: "todo" })
    status: string;

    @Column({ type: "int", default: 0 })
    order: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    user: User;
}