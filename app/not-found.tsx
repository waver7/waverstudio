import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { GradientText } from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <PageShell>
      <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-32 text-center">
        <p className="font-mono text-sm text-ink-muted">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          This page took <GradientText>a wrong turn</GradientText>.
        </h1>
        <p className="mt-4 max-w-md text-ink-secondary">
          The page you&apos;re looking for doesn&apos;t exist — but we can
          probably automate whatever brought you here.
        </p>
        <div className="mt-8">
          <GradientButton href="/" variant="solid" size="lg">
            Back home <ArrowRight className="h-4 w-4" />
          </GradientButton>
        </div>
      </section>
    </PageShell>
  );
}
