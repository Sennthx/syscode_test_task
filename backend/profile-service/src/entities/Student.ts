import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @Length(2, 50, { message: 'Name must be 2-50 characters' })
    name!: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;
}