import ruptures as rpt
import pandas as pd
import numpy as np

class ChangePointDetector:
    def __init__(self, data: pd.Series):
        self.data = data.values
        self.timestamps = data.index

    def detect_pelt(self, model="l2", penalty=3):
        """Detects change points using PELT algorithm."""
        algo = rpt.Pelt(model=model).fit(self.data)
        result = algo.predict(pen=penalty)
        # Convert indices back to timestamps
        change_points = [self.timestamps[i] for i in result if i < len(self.data)]
        return change_points