import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Simple select"        # Decides the title

def extract_newman_memory_use(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    memory_use_list = [ex["memoryUse"] for ex in data]

    return memory_use_list

prisma_memory_use = extract_newman_memory_use("reports/Select/report-Prisma_SimpleSelect-100-16-19-20.json")
sequelize_memory_use = extract_newman_memory_use("reports/Select/report-Sequelize_SimpleSelect-100-14-32-05.json")
sql_memory_use = extract_newman_memory_use("reports/Select/report-SQL_SimpleSelect-100-14-30-11.json")

mean_prisma = mean(prisma_memory_use)
mean_sequelize = mean(sequelize_memory_use)
mean_sql = mean(sql_memory_use)

prisma_interval = stats.norm.interval(0.95, loc=np.mean(prisma_memory_use), scale=stats.sem(prisma_memory_use))
sequelize_interval = stats.norm.interval(0.95, loc=np.mean(sequelize_memory_use), scale=stats.sem(sequelize_memory_use))
sql_interval = stats.norm.interval(0.95, loc=np.mean(sql_memory_use), scale=stats.sem(sql_memory_use))

print(f"Prisma mean [{mean_prisma:.3f}]")
print(f"Prisma 95% CI [{prisma_interval[0]:.3f}, {prisma_interval[1]:.3f}]")
print()
print(f"Sequelize mean [{mean_sequelize:.3f}]")
print(f"Sequelize 95% CI [{sequelize_interval[0]:.3f}, {sequelize_interval[1]:.3f}]")
print()
print(f"SQL mean [{mean_sql:.3f}]")
print(f"SQL 95% CI [{sql_interval[0]:.3f}, {sql_interval[1]:.3f}]")

engines = ['Prisma', 'Pure-SQL', 'Sequelize']
average = [mean_prisma, mean_sql, mean_sequelize]

plt.figure(figsize=(8, 6))
plt.bar(engines, average, color=['#2E5F7F', '#D87741', '#2E5F7F'], alpha=1)

plt.ylim(bottom=0, top=35)

plt.title(Title)
plt.ylabel('Mean memory use (MB)')
plt.xlabel('Engine')

for i, val in enumerate(average):
    plt.text(i, val + 0.1, f'{val:.1} MB', ha='center', fontweight='bold')

plt.tight_layout()
plt.show()