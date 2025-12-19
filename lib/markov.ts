export type State = "Low" | "Medium" | "High" | "Addiction";

export interface UsageLog {
  day: number;
  minutes: number;
}

export const STATES: State[] = ["Low", "Medium", "High", "Addiction"];

export function getMinutesFromState(state: State): number {
  switch (state) {
    case "Low":
      return 30;
    case "Medium":
      return 120;
    case "High":
      return 240;
    case "Addiction":
      return 480;
  }
}

export function getStateFromMinutes(minutes: number): State {
  if (minutes <= 60) return "Low";
  if (minutes <= 180) return "Medium";
  if (minutes <= 360) return "High";
  return "Addiction";
}

export class MarkovModel {
  private transitionMatrix: number[][];

  constructor(matrix?: number[][]) {
    // Default matrix if none provided (some reasonable defaults)
    this.transitionMatrix = matrix || [
      [0.7, 0.2, 0.1, 0.0], // Low
      [0.3, 0.5, 0.15, 0.05], // Medium
      [0.1, 0.3, 0.4, 0.2], // High
      [0.05, 0.1, 0.25, 0.6], // Addiction
    ];
  }

  /**
   * Estimates transition matrix from historical logs
   */
  static fromLogs(logs: UsageLog[]): MarkovModel {
    const counts: number[][] = Array(4)
      .fill(0)
      .map(() => Array(4).fill(0));
    const stateIndex = { Low: 0, Medium: 1, High: 2, Addiction: 3 };

    for (let i = 0; i < logs.length - 1; i++) {
      const fromState = getStateFromMinutes(logs[i].minutes);
      const toState = getStateFromMinutes(logs[i + 1].minutes);
      counts[stateIndex[fromState]][stateIndex[toState]]++;
    }

    const matrix: number[][] = counts.map((row) => {
      const sum = row.reduce((a, b) => a + b, 0);
      if (sum === 0) return [0.25, 0.25, 0.25, 0.25]; // Default for unknown
      return row.map((count) => count / sum);
    });

    return new MarkovModel(matrix);
  }

  /**
   * Predicts state distribution after N steps
   */
  predict(
    initialState: State,
    steps: number
  ): { distribution: number[]; trajectory: any[] } {
    const stateIndex = { Low: 0, Medium: 1, High: 2, Addiction: 3 };
    let currentDist = [0, 0, 0, 0];
    currentDist[stateIndex[initialState]] = 1;

    const trajectory = [];
    trajectory.push({ step: 0, ...this.formatDist(currentDist) });

    for (let i = 1; i <= steps; i++) {
      const nextDist = [0, 0, 0, 0];
      for (let j = 0; j < 4; j++) {
        // to state
        for (let k = 0; k < 4; k++) {
          // from state
          nextDist[j] += currentDist[k] * this.transitionMatrix[k][j];
        }
      }
      currentDist = nextDist;
      trajectory.push({ step: i, ...this.formatDist(currentDist) });
    }

    return {
      distribution: currentDist,
      trajectory,
    };
  }

  private formatDist(dist: number[]) {
    return {
      Low: dist[0],
      Medium: dist[1],
      High: dist[2],
      Addiction: dist[3],
    };
  }

  getTransitionMatrix() {
    return this.transitionMatrix;
  }
}

export function generateInterventions(risk: number, state: State): string[] {
  const interventions: string[] = [];

  if (risk > 0.5 || state === "Addiction") {
    interventions.push("🚀 Digital Detox: 24 hours without screens.");
    interventions.push("📵 Screen-free zones in the bedroom.");
    interventions.push("🛑 App limits: Hard cap on social media at 30 mins.");
  } else if (risk > 0.3 || state === "High") {
    interventions.push("⏰ Pomodoro technique: 25m work, 5m break.");
    interventions.push("🔔 Disable non-human notifications.");
    interventions.push("📱 Grayscale mode enabled after 8 PM.");
  } else {
    interventions.push("✅ Maintain current habits.");
    interventions.push("🧘 Mindfulness check-in before opening apps.");
    interventions.push("📚 Replace 15m of scroll time with reading.");
  }

  return interventions;
}

export function generateGeminiPrompt(
  trajectory: any[],
  risk: number,
  lastState: State
): string {
  const trajectorySummary = trajectory
    .slice(0, 5)
    .map(
      (t) => `Day ${t.step}: Addiction Probability ${(t.Addiction * 100).toFixed(1)}%`
    )
    .join(", ");

  return `
    As a Digital Wellness AI, analyze the following behavioral profile modeled via Markov Chains:
    - Current State: ${lastState}
    - 30-Day Addiction Risk: ${(risk * 100).toFixed(1)}%
    - Forecast Trajectory (Short-term): ${trajectorySummary}

    Given this data, generate a tailored digital hygiene plan that includes:
    1. A behavioral explanation of why the user is trending towards or staying in their current state.
    2. Three high-impact, actionable micro-interventions.
    3. A "Hard Reset" strategy if risk exceeds 50%.
    
    Format the response as a JSON object with fields: 'behavioralInsight', 'interventions' (array), and 'resetStrategy'.
  `;
}

export function generateDynamicInsight(risk: number, state: State): string {
  if (risk > 0.6) {
    return "Your behavioral data indicates a strong 'Attraction Loop' where high usage is becoming your default state. The Markov trajectory shows that without a hard reset, your probability of maintaining moderate habits is collapsing. Focus on physical boundaries—remove the device from your sleep environment immediately.";
  }
  if (risk > 0.3) {
    return "You are in a 'Transition Zone'. While your current state is manageable, the transition matrix shows a high 'leakage' from Medium to High usage. Your digital gravity is pulling you towards longer sessions. Implementing Pomodoro-style breaks will help stabilize your current equilibrium.";
  }
  if (state === "High") {
    return "Your current 'High' usage state is acting as a stable attractor. Even if your 30-day risk is statistically moderate, the immediate momentum of your daily logs suggests a high cognitive load from screen time. Reclaiming 20% of your morning for analog activities will disrupt this pattern.";
  }
  return "Your digital hygiene is currently in a 'Flow Equilibrium'. The transition probabilities show that you are successfully resisting the pull of addictive loops. To maintain this, focus on 'Mindful Entry'—always define your purpose before unlocking your device.";
}

