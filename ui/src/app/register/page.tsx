import RegisterClient from "./registerClient";
import { registerMetadata } from "./metadata";

export const metadata = registerMetadata;
export default function Page() {
  return <RegisterClient />;
}
