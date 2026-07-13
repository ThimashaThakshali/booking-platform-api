import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// This class becomes the Users table in PostgreSQL
@Entity('users')
export class User {
  //! is definite assignment assertion - this value wille exist laster
  // Auto-generated ID
  // Auto-generated ID
  @PrimaryGeneratedColumn()
  id!: number;

  // User's full name
  @Column()
  fullName!: string;

  // Email must be unique
  @Column({ unique: true })
  email!: string;

  // Store hashed password only
  @Column()
  password!: string;
}
