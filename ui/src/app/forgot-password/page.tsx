import ForgotClient from "./forgotClient";
import { forgotMetadata } from "./metadata";

export const metadata = forgotMetadata;
export default function Page() {
  return <ForgotClient />;
}
