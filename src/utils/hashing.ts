import * as bcrypt from 'bcrypt';

export const encrypt = async (rawpassword): Promise<string> => {
  return await bcrypt.hash(rawpassword, 10);
};
export const comparePassword = async (
  rawpassword,
  encryptPassword,
): Promise<boolean> => {
  return await bcrypt.compare(rawpassword, encryptPassword);
};
