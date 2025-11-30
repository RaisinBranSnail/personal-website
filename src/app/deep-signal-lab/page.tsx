'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Point = {
  t: number;
  value: number;
};

type AnnotatedPoint = Point & {
  isAnomaly: boolean;
};

type HistogramBin = {
  idx: number;
  start: number;
  end: number;
  count: number;
  flagged: number;
};

// Simple deterministic pseudo-random helper based only on the index
function pseudoRandom(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x); // in [0,1)
}

function generateBaseSeries(length = 220): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < length; i++) {
    const t = i;
    // Smooth baseline + a couple of bumps
    const baseline =
      0.3 * Math.sin(i / 15) +
      0.15 * Math.sin(i / 7) +
      0.1 * Math.cos(i / 21);

    // Deterministic \"noise\" so SSR and client renders match
    const noise =
      0.25 * Math.sin(i * 3.7) + (pseudoRandom(i) - 0.5) * 0.4;

    // Inject 2 to 3 \"interesting\" bumps that should become anomalies at lower thresholds
    let burst = 0;
    if (i > 40 && i < 60) burst += 1.4 * Math.exp(-Math.pow((i - 50) / 5, 2));
    if (i > 120 && i < 145)
      burst += 1.7 * Math.exp(-Math.pow((i - 132) / 4.5, 2));
    if (i > 180 && i < 200)
      burst += 1.2 * Math.exp(-Math.pow((i - 190) / 4, 2));

    const value = baseline + noise + burst;
    pts.push({ t, value });
  }
  return pts;
}

function annotateSeries(series: Point[], threshold: number): AnnotatedPoint[] {
  const values = series.map((p) => p.value);
  const mean =
    values.reduce((acc, v) => acc + v, 0) / (values.length || 1);
  const variance =
    values.reduce((acc, v) => acc + (v - mean) * (v - mean), 0) /
    (values.length || 1);
  const std = Math.sqrt(variance || 1e-8);

  return series.map((p) => {
    const z = (p.value - mean) / (std || 1e-8);
    const isAnomaly = z > threshold;
    return { ...p, isAnomaly };
  });
}

function buildPolylinePoints(
  data: AnnotatedPoint[],
  width: number,
  height: number
): string {
  if (data.length === 0) return '';
  const minT = data[0].t;
  const maxT = data[data.length - 1].t || 1;

  let minV = Infinity;
  let maxV = -Infinity;
  for (const p of data) {
    if (p.value < minV) minV = p.value;
    if (p.value > maxV) maxV = p.value;
  }
  if (minV === maxV) {
    minV -= 0.5;
    maxV += 0.5;
  }

  const points = data.map((p) => {
    const x =
      ((p.t - minT) / (maxT - minT || 1)) * (width - 40) + 20;
    const yNorm = (p.value - minV) / (maxV - minV || 1);
    const y = height - 20 - yNorm * (height - 40);
    return `${x},${y}`;
  });

  return points.join(' ');
}

export default function DeepSignalLabExplorer() {
  const [threshold, setThreshold] = useState(2.5);
  const [view, setView] = useState<'time' | 'dist'>('time');

  const baseSeries = useMemo(() => generateBaseSeries(), []);
  const annotated = useMemo(
    () => annotateSeries(baseSeries, threshold),
    [baseSeries, threshold]
  );

  const histogram: HistogramBin[] = useMemo(() => {
    if (!annotated.length) return [];

    let minV = Infinity;
    let maxV = -Infinity;
    for (const p of annotated) {
      if (p.value < minV) minV = p.value;
      if (p.value > maxV) maxV = p.value;
    }
    if (minV === maxV) {
      minV -= 0.5;
      maxV += 0.5;
    }

    const bins = 30;
    const width = maxV - minV || 1;
    const binSize = width / bins;

    const result: HistogramBin[] = Array.from({ length: bins }, (_, idx) => ({
      idx,
      start: minV + idx * binSize,
      end: minV + (idx + 1) * binSize,
      count: 0,
      flagged: 0,
    }));

    for (const p of annotated) {
      const raw = (p.value - minV) / (binSize || 1);
      const bIdx = Math.min(
        bins - 1,
        Math.max(0, Math.floor(isFinite(raw) ? raw : 0))
      );
      const bin = result[bIdx];
      bin.count += 1;
      if (p.isAnomaly) bin.flagged += 1;
    }

    return result;
  }, [annotated]);

  const total = annotated.length;
  const anomalies = annotated.filter((p) => p.isAnomaly).length;

  // Compute threshold trade off curve
  const thresholdCurve = useMemo(() => {
    const steps = 20;
    const minT = 1.0;
    const maxT = 4.5;
    const step = (maxT - minT) / steps;
    const curve: { threshold: number; alerts: number }[] = [];
    
    for (let i = 0; i <= steps; i++) {
      const t = minT + i * step;
      const ann = annotateSeries(baseSeries, t);
      curve.push({
        threshold: t,
        alerts: ann.filter((p) => p.isAnomaly).length,
      });
    }
    return curve;
  }, [baseSeries]);

  // Generate mini spectrogram data (time × frequency bands)
  const spectrogramData = useMemo(() => {
    const timeSteps = 50;
    const freqBands = 20;
    const data: number[][] = [];
    
    for (let t = 0; t < timeSteps; t++) {
      const row: number[] = [];
      for (let f = 0; f < freqBands; f++) {
        // Deterministic pattern with some structure
        const base = 0.3 + 0.2 * Math.sin(t / 8 + f / 3);
        const noise = 0.15 * pseudoRandom(t * freqBands + f);
        // Inject a few "signals"
        let signal = 0;
        if (t > 15 && t < 25 && f > 8 && f < 12) signal = 0.8;
        if (t > 35 && t < 40 && f > 5 && f < 7) signal = 0.6;
        row.push(Math.max(0, Math.min(1, base + noise + signal)));
      }
      data.push(row);
    }
    return data;
  }, []);

  // Compute z scores for spectrogram anomaly highlighting
  const spectrogramAnomalies = useMemo(() => {
    const flat = spectrogramData.flat();
    const mean = flat.reduce((a, b) => a + b, 0) / flat.length;
    const std = Math.sqrt(
      flat.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / flat.length
    );
    const anomalies: boolean[][] = spectrogramData.map((row) =>
      row.map((v) => (v - mean) / (std || 1e-8) > threshold)
    );
    return anomalies;
  }, [spectrogramData, threshold]);

  const width = 640;
  const height = 220;
  const polylinePoints = buildPolylinePoints(annotated, width, height);

  const anomalyCircles = () => {
    if (!annotated.length) return null;
    const minT = annotated[0].t;
    const maxT = annotated[annotated.length - 1].t || 1;

    let minV = Infinity;
    let maxV = -Infinity;
    for (const p of annotated) {
      if (p.value < minV) minV = p.value;
      if (p.value > maxV) maxV = p.value;
    }
    if (minV === maxV) {
      minV -= 0.5;
      maxV += 0.5;
    }

    return annotated
      .filter((p) => p.isAnomaly)
      .map((p) => {
        const x =
          ((p.t - minT) / (maxT - minT || 1)) * (width - 40) + 20;
        const yNorm = (p.value - minV) / (maxV - minV || 1);
        const y = height - 20 - yNorm * (height - 40);
        return (
          <circle
            key={p.t}
            cx={x}
            cy={y}
            r={3.2}
            className="fill-[var(--accent)] stroke-[var(--bg)] stroke-[0.8]"
          />
        );
      });
  };

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
              href="/projects/deep-signal-lab"
              className="hover:text-[var(--text)]"
            >
              Deep Signal Lab
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--text)]">
              Interactive Explorer
            </span>
          </nav>
          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold">
              Deep Signal Lab Interactive Explorer
            </h1>
          </div>
          <p className="text-[var(--muted)] mt-3 max-w-3xl">
            This explorer lets you play with two of the core Deep Signal Lab
            views in the browser: a time series with anomaly flags and the tail
            of the power distribution. Move the threshold and watch how the
            alerts and histogram change, mirroring the ideas from the full
            notebook analysis.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <h2 className="text-lg sm:text-xl font-semibold">
                {view === 'time'
                  ? 'Time series and anomaly view'
                  : 'Power distribution and anomaly tail'}
              </h2>
              <span className="text-xs font-mono text-[var(--muted)]">
                {anomalies} / {total} points flagged
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono">
              <button
                type="button"
                onClick={() => setView('time')}
                className={`px-2 py-1 rounded border ${
                  view === 'time'
                    ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface)]/60'
                }`}
              >
                Time series
              </button>
              <button
                type="button"
                onClick={() => setView('dist')}
                className={`px-2 py-1 rounded border ${
                  view === 'dist'
                    ? 'bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface)]/60'
                }`}
              >
                Distribution
              </button>
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]/80">
              {view === 'time' ? (
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full h-56 sm:h-64"
                  role="img"
                  aria-label="Simulated signal with anomalies highlighted"
                >
                  {/* Background grid */}
                  <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    className="fill-[var(--bg)]"
                  />
                  <polyline
                    points={polylinePoints}
                    className="fill-none stroke-[var(--primary)]"
                    strokeWidth={1.4}
                  />
                  {anomalyCircles()}
                </svg>
              ) : (
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full h-56 sm:h-64"
                  role="img"
                  aria-label="Histogram of simulated signal values with anomaly tail highlighted"
                >
                  <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    className="fill-[var(--bg)]"
                  />
                  {(() => {
                    if (!histogram.length) return null;
                    const maxCount = histogram.reduce(
                      (m, b) => (b.count > m ? b.count : m),
                      0
                    );
                    const paddingX = 24;
                    const paddingY = 20;
                    const innerWidth = width - paddingX * 2;
                    const innerHeight = height - paddingY * 2;
                    const barWidth = innerWidth / histogram.length;

                    return histogram.map((bin) => {
                      if (!maxCount) return null;
                      const h =
                        (bin.count / maxCount) * (innerHeight || 1);
                      const x =
                        paddingX + barWidth * bin.idx + barWidth * 0.05;
                      const y = height - paddingY - h;
                      const cls =
                        bin.flagged > 0
                          ? 'fill-[var(--accent)]'
                          : 'fill-[var(--primary)]/60';
                      return (
                        <rect
                          key={bin.idx}
                          x={x}
                          y={y}
                          width={barWidth * 0.9}
                          height={h}
                          className={cls}
                        />
                      );
                    });
                  })()}
                </svg>
              )}
            </div>
            <p className="text-[var(--muted)] text-sm mt-3">
              {view === 'time'
                ? 'Blue line shows the simulated signal. Pink dots are points whose value is above the chosen z score threshold relative to the overall distribution of this series.'
                : 'Bars show how often different power levels occur, and bars tinted with the accent color contain at least one flagged anomaly point in that range. As you raise or lower the threshold, you can see how much of the tail is treated as “interesting”.'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-3">
                Threshold control
              </h2>
              <label className="block text-xs font-mono text-[var(--muted)] mb-2">
                Z score threshold: {threshold.toFixed(1)}
              </label>
              <input
                type="range"
                min={1.0}
                max={4.5}
                step={0.1}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <p className="text-[var(--muted)] text-sm mt-3">
                Lower thresholds flag more points (higher sensitivity but
                more false positives). Higher thresholds flag only the
                strongest spikes (more conservative alerts).
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5 space-y-2 text-sm">
              <h3 className="font-semibold">Interpretation</h3>
              <p className="text-[var(--muted)]">
                This is a simplified version of the anomaly detector from
                the notebook: we compute a global mean and standard
                deviation for the series, then flag points whose value is
                more than a chosen number of standard deviations above that
                mean.
              </p>
              <p className="text-[var(--muted)]">
                In the full analysis, we use a more robust per-frequency
                approach (median + MAD) on a time&ndash;frequency grid; this
                interactive view gives recruiters an intuitive sense of how
                tuning the threshold changes what gets flagged.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/deep-signal-lab"
                  className="text-[var(--accent)] text-xs font-mono underline underline-offset-4"
                >
                  ← Back to Deep Signal Lab case study
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional interactive sections */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Threshold trade off curve */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              Threshold trade off curve
            </h3>
            <div className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]/80">
              <svg
                viewBox="0 0 400 180"
                className="w-full h-44"
                role="img"
                aria-label="Threshold vs alerts trade off curve"
              >
                <rect
                  x={0}
                  y={0}
                  width={400}
                  height={180}
                  className="fill-[var(--bg)]"
                />
                {(() => {
                  if (!thresholdCurve.length) return null;
                  const maxAlerts = Math.max(
                    ...thresholdCurve.map((p) => p.alerts)
                  );
                  const padding = 30;
                  const innerW = 400 - padding * 2;
                  const innerH = 180 - padding * 2;

                  // Draw curve
                  const points = thresholdCurve
                    .map((p, i) => {
                      const x = padding + (i / (thresholdCurve.length - 1)) * innerW;
                      const yNorm = maxAlerts > 0 ? 1 - p.alerts / maxAlerts : 0.5;
                      const y = padding + yNorm * innerH;
                      return `${x},${y}`;
                    })
                    .join(' ');

                  // Current threshold marker
                  const currentIdx = thresholdCurve.findIndex(
                    (p) => Math.abs(p.threshold - threshold) < 0.15
                  );
                  let markerX = padding;
                  let markerY = padding + innerH * 0.5;
                  if (currentIdx >= 0) {
                    markerX = padding + (currentIdx / (thresholdCurve.length - 1)) * innerW;
                    const yNorm =
                      maxAlerts > 0
                        ? 1 - thresholdCurve[currentIdx].alerts / maxAlerts
                        : 0.5;
                    markerY = padding + yNorm * innerH;
                  }

                  return (
                    <>
                      <polyline
                        points={points}
                        className="fill-none stroke-[var(--primary)]"
                        strokeWidth={2}
                      />
                      <circle
                        cx={markerX}
                        cy={markerY}
                        r={5}
                        className="fill-[var(--accent)] stroke-[var(--bg)] stroke-1"
                      />
                      <text
                        x={padding}
                        y={padding - 5}
                        className="text-[8px] fill-[var(--muted)] font-mono"
                      >
                        Alerts
                      </text>
                      <text
                        x={padding}
                        y={180 - padding + 12}
                        className="text-[8px] fill-[var(--muted)] font-mono"
                      >
                        Threshold
                      </text>
                    </>
                  );
                })()}
              </svg>
            </div>
            <p className="text-[var(--muted)] text-xs mt-2">
              Shows how many alerts you get at different thresholds. The pink
              dot marks your current setting. Lower thresholds = more alerts
              (higher sensitivity, more false positives).
            </p>
          </div>

          {/* Mini spectrogram */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              Mini spectrogram (time × frequency)
            </h3>
            <div className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]/80">
              <svg
                viewBox="0 0 400 200"
                className="w-full h-48"
                role="img"
                aria-label="Mini spectrogram heatmap"
              >
                <rect
                  x={0}
                  y={0}
                  width={400}
                  height={200}
                  className="fill-[var(--bg)]"
                />
                {spectrogramData.map((row, tIdx) =>
                  row.map((value, fIdx) => {
                    const cellW = 400 / row.length;
                    const cellH = 200 / spectrogramData.length;
                    const x = fIdx * cellW;
                    const y = tIdx * cellH;
                    const isAnomaly = spectrogramAnomalies[tIdx]?.[fIdx];
                    // Use a heatmap color scale: low = dark blue, high = bright yellow/red
                    const intensity = Math.min(1, Math.max(0, value));
                    const r = Math.floor(50 + intensity * 205);
                    const g = Math.floor(50 + intensity * 100);
                    const b = Math.floor(100 + intensity * 155);

                    return (
                      <rect
                        key={`${tIdx}-${fIdx}`}
                        x={x}
                        y={y}
                        width={cellW}
                        height={cellH}
                        fill={isAnomaly ? '#ff2d55' : `rgb(${r}, ${g}, ${b})`}
                        opacity={isAnomaly ? 0.85 : 0.7}
                        className="stroke-[var(--bg)] stroke-[0.3]"
                      />
                    );
                  })
                )}
                <text
                  x={10}
                  y={15}
                  className="text-[8px] fill-[var(--muted)] font-mono"
                >
                  Time →
                </text>
                <text
                  x={10}
                  y={195}
                  className="text-[8px] fill-[var(--muted)] font-mono"
                >
                  Frequency ↑
                </text>
              </svg>
            </div>
            <p className="text-[var(--muted)] text-xs mt-2">
              A simplified 2D view of signal power over time and frequency
              bands. Bright regions with accent color are flagged as anomalies
              at the current threshold. This mirrors the spectrogram style from
              the full analysis.
            </p>
          </div>
        </div>

        {/* Stats panel */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5 mt-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            Quick stats
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-[var(--muted)] font-mono mb-1">
                Flagged
              </div>
              <div className="text-lg font-semibold text-[var(--accent)]">
                {anomalies}
              </div>
              <div className="text-xs text-[var(--muted)]">
                {total > 0 ? ((anomalies / total) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div>
              <div className="text-xs text-[var(--muted)] font-mono mb-1">
                Threshold
              </div>
              <div className="text-lg font-semibold">{threshold.toFixed(1)}</div>
              <div className="text-xs text-[var(--muted)]">z score</div>
            </div>
            <div>
              <div className="text-xs text-[var(--muted)] font-mono mb-1">
                Max z score
              </div>
              <div className="text-lg font-semibold">
                {(() => {
                  const values = annotated.map((p) => p.value);
                  const mean =
                    values.reduce((a, b) => a + b, 0) / (values.length || 1);
                  const std = Math.sqrt(
                    values.reduce(
                      (a, b) => a + Math.pow(b - mean, 2),
                      0
                    ) / (values.length || 1)
                  );
                  const maxZ =
                    values.length > 0
                      ? (Math.max(...values) - mean) / (std || 1e-8)
                      : 0;
                  return maxZ.toFixed(1);
                })()}
              </div>
              <div className="text-xs text-[var(--muted)]">in series</div>
            </div>
            <div>
              <div className="text-xs text-[var(--muted)] font-mono mb-1">
                Total points
              </div>
              <div className="text-lg font-semibold">{total}</div>
              <div className="text-xs text-[var(--muted)]">time steps</div>
            </div>
          </div>
        </div>

        {/* Explanation section */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 sm:p-8 mt-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            What does all of this mean?
          </h2>
          <div className="space-y-4 text-[var(--muted)] leading-relaxed">
            <div>
              <h3 className="text-base font-semibold text-[var(--text)] mb-2">
                The core problem
              </h3>
              <p>
                In real world data analysis, you often need to monitor a stream
                of measurements and flag moments when something unusual happens.
                This could be a spike in server errors, a sudden change in user
                behavior, or in this case, a potential signal of interest in
                noisy radio telescope data. The challenge is deciding what counts
                as "unusual" without getting overwhelmed by false alarms.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--text)] mb-2">
                What you're seeing here
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong className="text-[var(--text)]">Time series view:</strong> Shows the
                  signal over time. The blue line is the actual measurement, and
                  pink dots mark points that exceed your chosen threshold. This
                  is the "monitoring dashboard" view, you can see at a glance when
                  something interesting happened.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Distribution view:</strong> Shows how
                  often different power levels occur. Most values cluster in the
                  middle (normal noise), but a few sit in the extreme right tail
                  (potential anomalies). Bars tinted with the accent color
                  contain flagged points. This view helps you understand where
                  your threshold sits relative to the bulk of the data.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Threshold trade off curve:</strong> This
                  is the key insight for any anomaly detection system. It shows
                  that as you lower the threshold, you catch more potential
                  signals but also flag more false positives. As you raise it,
                  you become more conservative but might miss real events. The
                  pink dot shows where you are on this curve right now.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Mini spectrogram:</strong> A 2D view
                  showing signal power across both time and frequency bands. This
                  is how radio astronomers actually visualize their data. Bright
                  regions with accent color are flagged as anomalies. This
                  connects the interactive explorer to the full Deep Signal Lab
                  analysis, where we work with time frequency grids.
                </li>
                <li>
                  <strong className="text-[var(--text)]">Quick stats:</strong> Real-time metrics
                  that update as you adjust the threshold. The percentage flagged
                  tells you how aggressive your detector is, and the max z score
                  shows how extreme the most unusual point in the series is.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--text)] mb-2">
                Why this matters for data analysis
              </h3>
              <p>
                This interactive explorer demonstrates a fundamental skill in
                data analysis: understanding the trade offs in your detection
                rules. In production systems, you need to balance sensitivity
                (catching real events) with specificity (avoiding false alarms).
                The threshold trade off curve makes this explicit, you can see
                exactly how many alerts you'll get at different sensitivity
                levels. This same pattern appears in fraud detection, system
                monitoring, quality control, and many other domains where you're
                looking for needles in haystacks.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--text)] mb-2">
                How this connects to the full analysis
              </h3>
              <p>
                The full Deep Signal Lab notebook uses a more sophisticated
                approach: instead of a single global threshold, we compute
                robust z scores per frequency band (using median and MAD instead
                of mean and standard deviation). This handles cases where
                different frequency bands have different baseline noise levels.
                But the core idea is the same: flag points that are unusually
                strong relative to their local context. This interactive
                explorer gives you an intuitive feel for how threshold tuning
                works, which is the foundation for understanding the more complex
                methods in the notebook.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <Link
                href="/projects/deep-signal-lab"
                className="text-[var(--accent)] text-sm font-mono underline underline-offset-4 hover:text-[var(--accent)]/80"
              >
                ← Back to Deep Signal Lab case study
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



