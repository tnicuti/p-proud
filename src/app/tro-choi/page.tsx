import type { Metadata } from "next";
import { GameCorner } from "@/components/games/GameCorner";
import { Wrap } from "@/components/ui/Layout";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Góc trò chơi",
  description: "Vừa chơi vừa học với Myth hay Fact, Quiz 6 bài học và trò chơi chuẩn bị Túi kỳ đầu.",
};

export default function GamesPage() {
  return (
    <Wrap>
      <PageHeader mascot="pipi-jump" chip="Góc trò chơi" title="Vừa chơi vừa học">
        Thu thập điểm vương miện qua ba trò chơi. Điểm của bạn được lưu lại trên thiết bị này.
      </PageHeader>
      <div className="mt-4">
        <GameCorner />
      </div>
    </Wrap>
  );
}
