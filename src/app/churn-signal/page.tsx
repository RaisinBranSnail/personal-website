'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type CustomerProfile = {
  tenureDays: number;
  paymentIssues: boolean;
  daysSinceLogin: number;
  supportTickets: number;
  featureUsage: number;
  tier: 'Basic' | 'Pro' | 'Enterprise';
};

function calculateRiskScore(profile: CustomerProfile): number {
  let risk = 0.0;
  risk += profile.paymentIssues ? 0.3 : 0.0;
  risk += profile.daysSinceLogin > 30 ? 0.25 : 0.0;
  risk += profile.tenureDays < 30 ? 0.2 : 0.0;
  risk += profile.supportTickets > 2 ? 0.15 : 0.0;
  risk += profile.featureUsage < 0.3 ? 0.1 : 0.0;
  risk += profile.tier === 'Basic' ? 0.05 : 0.0;
  return Math.min(1.0, Math.max(0.0, risk));
}

function getRiskSegment(score: number): 'Low Risk' | 'Medium Risk' | 'High Risk' {
  if (score < 0.2) return 'Low Risk';
  if (score < 0.5) return 'Medium Risk';
  return 'High Risk';
}

function estimateChurnProbability(score: number): number {
  // Simple mapping: risk score to estimated churn probability
  return Math.min(0.95, Math.max(0.05, score * 1.2));
}

export default function ChurnSignalExplorer() {
  const [profile, setProfile] = useState<CustomerProfile>({
    tenureDays: 90,
    paymentIssues: false,
    daysSinceLogin: 7,
    supportTickets: 1,
    featureUsage: 0.6,
    tier: 'Pro',
  });

  const riskScore = useMemo(() => calculateRiskScore(profile), [profile]);
  const riskSegment = useMemo(() => getRiskSegment(riskScore), [riskScore]);
  const churnProb = useMemo(() => estimateChurnProbability(riskScore), [riskScore]);

  const segmentColor = {
    'Low Risk': '#5ac8fa',
    'Medium Risk': '#ffa500',
    'High Risk': '#ff2d55',
  }[riskSegment];

  return (
    <main id="main" className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[var(--primary)]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-10">
          <nav className="text-sm text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--text)]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#works" className="hover:text-[var(--text)]">
              Projects
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/projects/churn-signal"
              className="hover:text-[var(--text)]"
            >
              Churn Signal
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text)]">
              Interactive Explorer
            </span>
          </nav>
          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold">
              Churn Signal Interactive Explorer
            </h1>
          </div>
          <p className="text-[var(--muted)] mt-3 max-w-3xl">
            This explorer lets you adjust customer profile attributes and see how
            they affect churn risk scoring. Move the sliders to understand which
            factors drive the risk segmentation model used in the full analysis.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Customer Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--muted)] mb-2">
                    Tenure: {profile.tenureDays} days
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={730}
                    step={1}
                    value={profile.tenureDays}
                    onChange={(e) =>
                      setProfile({ ...profile, tenureDays: Number(e.target.value) })
                    }
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--muted)] mb-2">
                    Subscription Tier
                  </label>
                  <select
                    value={profile.tier}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        tier: e.target.value as 'Basic' | 'Pro' | 'Enterprise',
                      })
                    }
                    className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text)]"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--muted)] mb-2">
                    Days Since Last Login: {profile.daysSinceLogin}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={90}
                    step={1}
                    value={profile.daysSinceLogin}
                    onChange={(e) =>
                      setProfile({ ...profile, daysSinceLogin: Number(e.target.value) })
                    }
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--muted)] mb-2">
                    Feature Usage: {(profile.featureUsage * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={profile.featureUsage * 100}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        featureUsage: Number(e.target.value) / 100,
                      })
                    }
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--muted)] mb-2">
                    Support Tickets: {profile.supportTickets}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={profile.supportTickets}
                    onChange={(e) =>
                      setProfile({ ...profile, supportTickets: Number(e.target.value) })
                    }
                    className="w-full accent-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.paymentIssues}
                      onChange={(e) =>
                        setProfile({ ...profile, paymentIssues: e.target.checked })
                      }
                      className="accent-[var(--accent)]"
                    />
                    <span className="text-sm text-[var(--text)]">
                      Payment Issues
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Risk Assessment
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[var(--muted)]">Risk Score</span>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: segmentColor }}
                    >
                      {(riskScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-4 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${riskScore * 100}%`,
                        backgroundColor: segmentColor,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="text-sm text-[var(--muted)] mb-2">Risk Segment</div>
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: segmentColor }}
                  >
                    {riskSegment}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="text-sm text-[var(--muted)] mb-2">
                    Estimated Churn Probability
                  </div>
                  <div className="text-2xl font-bold text-[var(--accent)]">
                    {(churnProb * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5 space-y-2 text-sm">
              <h3 className="font-semibold">Interpretation</h3>
              <p className="text-[var(--muted)]">
                The risk score combines multiple factors: payment issues (30% weight),
                inactivity (25%), new customer status (20%), support tickets (15%),
                low feature usage (10%), and Basic tier (5%). Higher scores indicate
                customers more likely to churn.
              </p>
              <p className="text-[var(--muted)]">
                This simplified model mirrors the segmentation approach in the full
                Churn Signal analysis, where we identify high-risk customers for
                targeted retention campaigns.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/churn-signal"
                  className="text-[var(--accent)] text-xs font-mono underline underline-offset-4"
                >
                  ← Back to Churn Signal case study
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

