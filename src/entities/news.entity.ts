import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { NewsCategory, NewsStatus } from "../enums";

@Entity()
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  content!: string;

  @Column({ type: "enum", enum: NewsCategory })
  category: NewsCategory;

  @Column({ type: "enum", enum: NewsStatus })
  status: NewsStatus;

  @Column({ type: "timestamp", nullable: true })
  publishedDate: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
