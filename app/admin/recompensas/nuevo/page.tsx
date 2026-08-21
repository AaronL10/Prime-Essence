import RewardForm from "@/components/admin/RewardForm";

export default function NuevaRecompensaPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Nueva recompensa</h1>
      <div className="mt-8">
        <RewardForm mode="create" />
      </div>
    </div>
  );
}