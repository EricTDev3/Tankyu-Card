"use client";
import { useState } from "react";
import axios from "axios";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function CardImageSearch({
  fillCardFields,
  setSelectedCardId,
  setSelectedCardImage,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [identifiedName, setIdentifiedName] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setError(null);
    setIdentifiedName(null);

    if (!selected) {
      setFile(null);
      setPreview(null);
      return;
    }

    if (!allowedTypes.includes(selected.type)) {
      setFile(null);
      setPreview(null);
      setError("Please choose a JPEG, PNG, or WebP image.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleIdentify = async () => {
    if (!file) {
      setError("Please choose an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setIdentifiedName(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "/api/shoppingList/identifyCard",
        formData,
        { withCredentials: true },
      );

      const card = response.data;
      fillCardFields(card.name, card.set);
      setSelectedCardId(card.id);
      setSelectedCardImage(card.image ?? null);
      setIdentifiedName(card.name);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to identify card from image.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-auto">
      <div className="flex flex-row items-stretch gap-2">
        <label className="block w-48 cursor-pointer rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <span className="block truncate text-gray-400 sm:text-sm">
            {file ? file.name : "choose image"}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        <button
          type="button"
          onClick={handleIdentify}
          disabled={loading}
          className="shrink-0 rounded-md bg-purple-700 px-3 py-1.5 text-sm font-hiro font-semibold text-yellow-300 shadow-sm outline outline-1 outline-yellow-400 hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
        >
          {loading ? "..." : "Identify"}
        </button>
      </div>
      {preview && (
        <img
          src={preview}
          alt="Selected card"
          className="mt-2 h-20 w-14 object-cover rounded"
        />
      )}
      {error && <p className="mt-1 text-sm text-red-200">{error}</p>}
    </div>
  );
}
