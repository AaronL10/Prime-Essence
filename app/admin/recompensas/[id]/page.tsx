import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RewardForm from "@/components/admin/RewardForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarRecompensaPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: reward, error } = await supabase
    .from("rewards")
    .select("id, name, description, image, points_cost, stock, active")
    .eq("id", id)
    .single();

  if (error || !reward) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Editar recompensa</h1>
      <div className="mt-8">
        <RewardForm
          mode="edit"
          rewardId={reward.id}
          initialValues={{
            name: reward.name,
            description: reward.description ?? "",
            image: reward.image ?? "",
            points_cost: reward.points_cost,
            stock: reward.stock,
            active: reward.active,
          }}
        />
      </div>
    </div>
  );
}