"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { ambassadorRoles, rolesWithContact, validateAmbassador, type AmbassadorRole } from "@/lib/validation";

export function AmbassadorForm() {
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState<AmbassadorRole | "">("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const askContact = role !== "" && rolesWithContact.includes(role);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { nickname, role, contact, reason };
    const check = validateAmbassador(payload);
    if (!check.ok) return setError(check.error);
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/ambassadors", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) return setError(data.error ?? "Chưa gửi được, bạn thử lại sau nhé.");
      setDone(true);
    } catch {
      setError("Chưa gửi được, bạn thử lại sau nhé.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="mt-3 rounded-[14px] bg-gold-soft px-3.5 py-3 text-center text-[15px]" role="status">
        <Mascot name="pipi-drum" height={110} className="mx-auto mb-1.5" />
        <b className="text-gold-ink">Cảm ơn bạn!</b>
        <br />
        Đăng ký của bạn đã được gửi. Nhóm sẽ liên hệ qua thầy cô chủ nhiệm.
      </div>
    );
  }

  const clear = () => error && setError("");

  return (
    <form noValidate onSubmit={onSubmit}>
      <label htmlFor="amb-nick">Biệt danh</label>
      <input
        id="amb-nick"
        value={nickname}
        maxLength={40}
        placeholder="Hoa Hướng Dương"
        aria-required="true"
        onChange={(e) => (setNickname(e.target.value), clear())}
      />
      <label htmlFor="amb-role">Bạn là</label>
      <select
        id="amb-role"
        value={role}
        aria-required="true"
        onChange={(e) => (setRole(e.target.value as AmbassadorRole | ""), clear())}
      >
        <option value="">Chọn một</option>
        {ambassadorRoles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      {askContact && (
        <>
          <label htmlFor="amb-contact">Email hoặc số điện thoại (không bắt buộc)</label>
          <input
            id="amb-contact"
            value={contact}
            maxLength={80}
            autoComplete="off"
            onChange={(e) => (setContact(e.target.value), clear())}
          />
        </>
      )}
      <label htmlFor="amb-why">Vì sao bạn muốn tham gia?</label>
      <textarea
        id="amb-why"
        rows={3}
        value={reason}
        maxLength={500}
        placeholder="Mình muốn các bạn trong lớp bớt ngại khi nói về kinh nguyệt"
        onChange={(e) => setReason(e.target.value)}
      />
      <div className="mt-1.5 min-h-[1em] text-[13px] text-ruby" role="alert">
        {error}
      </div>
      <Button type="submit" disabled={sending}>
        {sending ? "Đang gửi…" : "Gửi đăng ký"}
      </Button>
    </form>
  );
}
