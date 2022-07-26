import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { UserStatus, UserType } from "../enums";

@Entity()
export class UserEntity {
  @PrimaryColumn({
    type: "uuid",
    generated: "uuid",
  })
  id: string;

  @Column({ type: "varchar" })
  login!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "enum", enum: UserType })
  type: UserType;

  @Column({ type: "enum", enum: UserStatus })
  status: UserStatus;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
