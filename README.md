
***

# Brent Oil Price: Change Point Analysis & Statistical Modeling
### 🛢️ Birhan Energies Strategic Intelligence Division

[![Python Unit Tests](https://github.com/bethelhemf/Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data/actions/workflows/unittests.yml/badge.svg)](https://github.com/bethelhemf/Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data/actions)

## 📌 Project Overview
This project provides a data-driven analysis of Brent Crude oil prices (1987–2022). Our objective is to identify **structural breaks** (Change Points) in the market caused by major geopolitical and economic events, such as OPEC policy shifts, regional conflicts, and global financial crises.

By leveraging **Bayesian Inference (PyMC)** and **Advanced Time Series Modeling**, we quantify how these events shift price "regimes," providing Birhan Energies' stakeholders with actionable insights for risk management and policy development.

---

## 🚀 Key Features
- **Exploratory Data Analysis (EDA):** Trend decomposition and volatility clustering analysis.
- **Statistical Testing:** Augmented Dickey-Fuller (ADF) tests for stationarity.
- **Bayesian Change Point Detection:** Probabilistic modeling of "Switch Points" using MCMC sampling.
- **Event Correlation:** Mapping structural breaks to real-world events (e.g., Arab Spring, 2008 Crash).
- **Interactive Dashboard:** A Full-stack (Flask + React) application for stakeholder data exploration.

---

## 📁 Project Structure
```text
├── .github/workflows/      # CI/CD pipelines
├── backend/                # Flask API (Task 3)
├── frontend/               # React Dashboard (Task 3)
├── data/
│   ├── raw/                # Original CSVs & Event data
│   └── processed/          # Cleaned & Transformed data
├── notebooks/              # Analysis & Bayesian Modeling
├── src/                    # Core logic & Error handling
├── tests/                  # Unit testing
├── requirements.txt        # Python dependencies
└── pyproject.toml          # Project configuration
```

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```cmd
git clone https://github.com/bethelhemf/Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data.git
cd Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data
```

### 2. Python Environment Setup
```cmd
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pip install -e .
```

### 3. Frontend Setup (Dashboard)
```cmd
cd frontend
npm install
```

---

## 📊 Methodology & Results

### Task 1: Foundation
- **Stationarity:** Determined that raw prices are non-stationary ($p > 0.05$), while log-returns are stationary ($p < 0.01$).
- **Volatility:** Identified significant "clustering" around 2008 and 2020.

### Task 2: Bayesian Modeling
Using a **PyMC Switch-Point Model**, we identified a major structural break:
- **Date:** December 16, 2010 (Aligned with the onset of the **Arab Spring**).
- **Quantified Impact:** The average price shifted from **$71.53** to **$110.98**.
- **Market Shift:** A **+55.15% permanent increase** in the price floor during this period.

---

## 🖥️ Interactive Dashboard (Task 3)
The dashboard allows users to:
1.  **Visualize** historical trends with detected change-point markers.
2.  **Filter** data by date range.
3.  **Explore** specific geopolitical events and their immediate impact on price stability.

**To Run:**
- **Backend:** `cd backend && python app.py`
- **Frontend:** `cd frontend && npm start`

---

## 🛡️ Robustness & Validation
- **Error Handling:** Core modules include input validation and logging for missing data.
- **Convergence:** Bayesian models are validated using $R_{hat}$ metrics and trace plot analysis to ensure MCMC stability.
- **CI/CD:** Automated testing via GitHub Actions ensures code reliability on every push.

---

## 👥 Contributors
- **Bethelhem Feyisa** - Lead Data Scientist
- **Birhan Energies Division**

## 📄 License
This project is for internal consultancy use at Birhan Energies. All rights reserved.

---
**Birhan Energies: Powering Decisions with Data.**

## 🖥️ Dashboard Setup & Usage (Task 3)

### Prerequisites
- Python 3.x
- Node.js & NPM

### Running the Application
1. **Start the Backend:**
   ```bash
   cd backend
   python app.py