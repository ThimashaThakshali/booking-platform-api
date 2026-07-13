import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// This class becomes the services table
@Entity('services')
export class Service {
  // Auto-generated ID
  @PrimaryGeneratedColumn()
  id!: number;

  // Service title
  @Column()
  title!: string;

  // Service description
  @Column('text')
  description!: string;

  // Duration in minutes
  @Column()
  duration!: number;

  // Price
  @Column('decimal')
  price!: number;

  // Whether service is available
  @Column({ default: true })
  isActive!: boolean;
}
