export interface userDoc extends Document {
  name: string;
  email: string;
  photo?: string;
  role: string;
  password: string;
  passwordConfirm: string | undefined;
  passwordChangedAt?: Date;
  passwordResetToken?: String;
  passwordResetExpires?: Date;
  active: boolean;
  checkPassword: (paramOne: string, paramTwo: string) => Promise<boolean>;
  checkPasswordIfChanged: (param: number) => boolean;
}
