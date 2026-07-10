import pandas as pd
import matplotlib.pyplot as plt
from src.detector import ChangePointDetector

def main():
    # 1. Generate Synthetic Data
    n_samples, sigma = 500, 5
    n_bkps = 4  # number of breakpoints
    signal, bkps = rpt.pw_constant(n_samples, n_bkps, sigma)
    ts = pd.Series(signal, index=pd.date_range("2023-01-01", periods=n_samples))

    # 2. Detect Change Points
    detector = ChangePointDetector(ts)
    points = detector.detect_pelt()

    print(f"Change points detected at: {points}")

    # 3. Plotting
    plt.figure(figsize=(12, 6))
    plt.plot(ts, label="Time Series")
    for p in points:
        plt.axvline(x=p, color='red', linestyle='--', alpha=0.8)
    plt.title("Change Point Detection using PELT")
    plt.legend()
    plt.show()

if __name__ == "__main__":
    main()