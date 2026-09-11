"use client";

import { useState } from "react";
import OdiDaChipsLanding from "@/components/OdiDaChipsLanding";
import ChipCounterApp from "@/components/ChipCounterApp";

export default function Home() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <OdiDaChipsLanding onStart={() => setShowApp(true)} />;
  }

  return <ChipCounterApp onBack={() => setShowApp(false)} />;
}
