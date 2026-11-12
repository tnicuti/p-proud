import { ButtonLink } from "@/components/ui/Button";
import { Lead, Wrap } from "@/components/ui/Layout";
import { Mascot } from "@/components/ui/Mascot";

export default function NotFound() {
  return (
    <Wrap className="py-16 text-center">
      <Mascot name="pipi-cloud" height={180} className="mx-auto mb-4 animate-bob" />
      <h1>Ôi, PiPi ngủ quên mất rồi!</h1>
      <Lead className="mx-auto mb-6">Trang bạn tìm không có ở đây. Mình quay về trang chủ nhé.</Lead>
      <ButtonLink href="/">Về trang chủ</ButtonLink>
    </Wrap>
  );
}
