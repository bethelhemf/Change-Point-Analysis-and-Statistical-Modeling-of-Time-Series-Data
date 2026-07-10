import pytest
import pandas as pd
import numpy as np
from src.detector import ChangePointDetector

def test_detector_returns_list():
    data = pd.Series(np.random.randn(100), index=pd.date_range("2020-01-01", periods=100))
    detector = ChangePointDetector(data)
    points = detector.detect_pelt()
    assert isinstance(points, list)