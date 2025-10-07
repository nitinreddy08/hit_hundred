import { useState } from "react";
import { Edit2, Trash2, Plus, Minus, Check } from "lucide-react";
import { calculateNutrition } from "../data/foodDB";

const MealSection = ({ meal, entries, onUpdateQuantity, onRemoveFood }) => {
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const startEditing = (entry) => {
    setEditingId(entry.id);
    setEditQuantity(entry.quantity.toString());
  };

  const saveEdit = (id) => {
    const newQuantity = parseFloat(editQuantity);
    if (newQuantity > 0) {
      onUpdateQuantity(id, newQuantity);
    }
    setEditingId(null);
    setEditQuantity("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditQuantity("");
  };

  const adjustQuantity = (id, currentQuantity, delta) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    onUpdateQuantity(id, newQuantity);
  };

  return (
    <div className={`rounded-xl border-2 ${meal.color} p-3 break-inside-avoid`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-800 flex items-center">
          <span className="text-xl mr-1.5">{meal.emoji}</span>
          {meal.label}
        </h3>
        <span className="text-xs text-gray-600 bg-white/60 px-1.5 py-0.5 rounded-full">
          {entries.length} item{entries.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-2.5">
        {entries.map((entry) => {
          const nutrition = calculateNutrition(entry.food, entry.quantity);
          const isEditing = editingId === entry.id;

          return (
            <div
              key={entry.id}
              className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{entry.food.emoji}</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {entry.food.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {nutrition.calories.toFixed(0)} cal •{" "}
                      {nutrition.protein.toFixed(1)}g protein
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-0.5">
                    {/* Removed +/- quick adjust buttons per request */}

                    {isEditing ? (
                      <div className="flex items-center space-x-0.5">
                        <label
                          htmlFor={`meal-edit-qty-${entry.id}`}
                          className="sr-only"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          id={`meal-edit-qty-${entry.id}`}
                          name={`meal-edit-quantity-${entry.id}`}
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(entry.id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                          onBlur={() => saveEdit(entry.id)}
                          className="w-14 px-1.5 py-0.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-black"
                          autoFocus
                        />
                        <button
                          onMouseDown={() => saveEdit(entry.id)}
                          className="p-0.5 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-0.5">
                        <button
                          onClick={() => startEditing(entry)}
                          className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                        <span className="text-xs font-medium text-gray-700 min-w-[2.5rem] text-center">
                          {entry.quantity}
                          {entry.food.defaultUnit === "ml"
                            ? "ml"
                            : entry.food.defaultUnit === "piece"
                            ? "U"
                            : "g"}
                        </span>
                      </div>
                    )}

                    {/* Removed + increase button to match requested UI */}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => setPendingDeleteId(entry.id)}
                    disabled={isEditing}
                    className={`p-0.5 rounded-full transition-colors ${
                      isEditing
                        ? "text-red-400 opacity-50 pointer-events-none"
                        : "text-red-600 hover:bg-red-100"
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Delete confirmation popup */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPendingDeleteId(null)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl p-4 w-[90%] max-w-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Delete item?
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const id = pendingDeleteId;
                  setPendingDeleteId(null);
                  onRemoveFood(id);
                }}
                className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSection;
