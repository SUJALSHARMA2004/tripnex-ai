import { startTransition, useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import PlanModal from "../components/PlanModal";
import { deletePlan, getPlans } from "../api/travelApi";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadPlans = async () => {
      try {
        const res = await getPlans();

        if (!ignore) {
          startTransition(() => {
            setError("");
            setPlans(res.data.data || res.data);
          });
        }
      } catch (err) {
        if (!ignore) {
          startTransition(() => {
            setError(err.response?.data?.message || "Failed to load plans");
          });
        }
      }
    };

    loadPlans();

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      setError("");
      await deletePlan(id);
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
      setSelectedPlan((prev) => (prev?._id === id ? null : prev));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete plan");
      throw err;
    }
  };

  return (
    <div className="p-4">
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <TripCard
            key={plan._id}
            plan={plan}
            onDelete={handleDelete}
            onOpen={setSelectedPlan}
          />
        ))}
      </div>

      {!error && plans.length === 0 && (
        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-6 text-center text-sm text-orange-700">
          No plans found yet.
        </div>
      )}

      {selectedPlan && (
        <PlanModal
          key={selectedPlan._id}
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};

export default Plans;
