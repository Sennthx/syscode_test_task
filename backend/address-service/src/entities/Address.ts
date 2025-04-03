import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Student } from './Student';

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    address!: string;

    @Column({ name: 'student_id', unique: true })
    studentId!: string;

    @OneToOne(() => Student)
    @JoinColumn({ name: 'student_id' })
    student!: Student;
}