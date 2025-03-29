import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string;
}