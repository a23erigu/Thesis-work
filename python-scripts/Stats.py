import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

def extract_newman_times(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    executions = data["run"]["executions"]

    times_list = [ex["response"]["responseTime"] for ex in executions if "response" in ex]

    return times_list

prisma_times = extract_newman_times('response-times-advanced-prisma.json')
sql_times = extract_newman_times('response-times-advanced-sql.json')

mean_prisma = mean(prisma_times)
mean_sql = mean(sql_times)

prisma_interval = stats.norm.interval(0.95, loc=np.mean(prisma_times), scale=stats.sem(prisma_times))
sql_interval = stats.norm.interval(0.95, loc=np.mean(sql_times), scale=stats.sem(sql_times))

print(f"Prisma mean [{mean_prisma:.3f}]")
print(f"Prisma 95% CI [{prisma_interval[0]:.3f}, {prisma_interval[1]:.3f}]")
print()
print(f"SQL mean [{mean_sql:.3f}]")
print(f"SQL 95% CI [{sql_interval[0]:.3f}, {sql_interval[1]:.3f}]")

engines = ['Prisma', 'pure-SQL']
average = [mean_prisma, mean_sql]

plt.figure(figsize=(8, 6))
plt.bar(engines, average, color=['#2E5F7F', '#D87741'], alpha=1)

plt.ylim(bottom=3.0, top=10)

plt.title('All pets from city (advanced)')
plt.ylabel('Mean response times(ms)')
plt.xlabel('Engine')

for i, val in enumerate(average):
    plt.text(i, val + 0.1, f'{val:.2} ms', ha='center', fontweight='bold')

plt.tight_layout()
plt.show()