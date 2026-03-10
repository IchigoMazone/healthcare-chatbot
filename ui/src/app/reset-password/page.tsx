import ResetClient from "./resetClient";
import { resetMetadata } from "./metadata";

export const metadata = resetMetadata;
export default function Page() {
  return <ResetClient />;
}
