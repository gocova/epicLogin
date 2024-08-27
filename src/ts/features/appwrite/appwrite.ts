import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("{{YOUR PROJECT ID}}");

export const account = new Account(client);
export { ID } from "appwrite";
