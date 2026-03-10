import LoginClient from "./loginClient";
import { loginMetadata } from "./metadata";

export const metadata = loginMetadata;
export default function Page() {
  return <LoginClient />;
}
