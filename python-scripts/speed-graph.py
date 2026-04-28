import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Simple Select"        # Decides the title

def extract_newman_times(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    times_list = [ex["responseTime"] for ex in data]

    return times_list

prisma_times = extract_newman_times("reports/Create/report-Prisma_SimpleCreate-10000-17-07-51.json")
sequelize_times = extract_newman_times("reports/Create/report-Sequelize_SimpleCreate-10000-10-48-59.json")
sql_times = extract_newman_times("reports/Create/report-SQL_SimpleCreate-10000-11-55-00.json")

mean_prisma = mean(prisma_times)
mean_sequelize = mean(sequelize_times)
mean_sql = mean(sql_times)

prisma_interval = stats.norm.interval(0.95, loc=np.mean(prisma_times), scale=stats.sem(prisma_times))
sequelize_interval = stats.norm.interval(0.95, loc=np.mean(sequelize_times), scale=stats.sem(sequelize_times))
sql_interval = stats.norm.interval(0.95, loc=np.mean(sql_times), scale=stats.sem(sql_times))

print(f"Prisma mean [{mean_prisma:.3f}]")
print(f"Prisma 95% CI [{prisma_interval[0]:.3f}, {prisma_interval[1]:.3f}]")
print()
print(f"Sequelize mean [{mean_sequelize:.3f}]")
print(f"Sequelize 95% CI [{sequelize_interval[0]:.3f}, {sequelize_interval[1]:.3f}]")
print()
print(f"SQL mean [{mean_sql:.3f}]")
print(f"SQL 95% CI [{sql_interval[0]:.3f}, {sql_interval[1]:.3f}]")

engines = ['Prisma', 'Sequelize', 'Pure-SQL']
average = [mean_prisma, mean_sequelize, mean_sql]

plt.figure(figsize=(8, 6))
plt.bar(engines, average, color=['#2E5F7F', '#D87741', '#2E5F7F'], alpha=1)

plt.ylim(bottom=0, top=8)

plt.title(Title)
plt.ylabel('Mean response times(ms)')
plt.xlabel('Engine')

for i, val in enumerate(average):
    plt.text(i, val + 0.1, f'{val:.2} ms', ha='center', fontweight='bold')

plt.tight_layout()
plt.show()