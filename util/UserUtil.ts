import path from "path";
import { EcomCategory } from "../models/EcomCategory";
const jsonfile = require("jsonfile");

export class USerUtil {
  private static usersJsonPath = path.join(__dirname, "..", "db", "category.json");

  public static getAllUsersFromDB(): Promise<EcomCategory[]> {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(this.usersJsonPath, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    }
}
