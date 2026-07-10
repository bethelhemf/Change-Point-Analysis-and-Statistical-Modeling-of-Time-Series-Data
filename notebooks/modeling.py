from statsmodels.tsa.statespace.sarimax import SARIMAX

def fit_statistical_model(series, order=(1, 1, 1)):
    """Fits an ARIMA model to a segment of data."""
    model = SARIMAX(series, order=order)
    model_fit = model.fit(disp=False)
    return model_fit