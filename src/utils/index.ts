import bcrypt from "bcrypt";

const hashedPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    console.log("utils/hashedPassword", error);
    return null;
  }
};

export { hashedPassword };
