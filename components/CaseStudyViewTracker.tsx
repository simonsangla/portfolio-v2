"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function CaseStudyViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("case_study_view", { slug });
  }, [slug]);
  return null;
}
