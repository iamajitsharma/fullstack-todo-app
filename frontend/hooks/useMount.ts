"use client";
import { useEffect, useState } from "react";

export function useMount() {
  const [hasMount, setHasMount] = useState<boolean>(false);

  useEffect(() => {
    setHasMount(true);
  });

  return { hasMount };
}
