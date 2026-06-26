"use client";

import { useCallback, useState } from "react";
import { uploadLandingImage } from "@/lib/actions/upload-landing-image";

export function useLandingImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadLandingImage(formData);
    setUploading(false);

    if (result.error) {
      setError(result.error);
      return null;
    }

    return result.url ?? null;
  }, []);

  return {
    uploadFile,
    uploading,
    error,
    clearError: () => setError(null),
  };
}
