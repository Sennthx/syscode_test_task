import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    address!: string;
}