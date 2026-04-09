import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

ORM = "Sequelize"       # Decides what ORM is being used
Title = "All Owners"        # Decides the title

def extract_newman_times(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    times_list = [ex["responseTime"] for ex in data]

    return times_list

orm_times = extract_newman_times("report-Sequelize_AllOwners.postman_collection.json-100-15-23-50.json")
sql_times = extract_newman_times("report-SQL_AllOwners.postman_collection.json-100-15-21-37.json")

mean_orm = mean(orm_times)
mean_sql = mean(sql_times)

orm_interval = stats.norm.interval(0.95, loc=np.mean(orm_times), scale=stats.sem(orm_times))
sql_interval = stats.norm.interval(0.95, loc=np.mean(sql_times), scale=stats.sem(sql_times))

print(ORM +  f" mean [{mean_orm:.3f}]")
print(ORM + f" 95% CI [{orm_interval[0]:.3f}, {orm_interval[1]:.3f}]")
print()
print(f"SQL mean [{mean_sql:.3f}]")
print(f"SQL 95% CI [{sql_interval[0]:.3f}, {sql_interval[1]:.3f}]")

engines = [ORM, 'pure-SQL']
average = [mean_orm, mean_sql]

plt.figure(figsize=(8, 6))
plt.bar(engines, average, color=['#2E5F7F', '#D87741'], alpha=1)

plt.ylim(bottom=0, top=8)

plt.title(Title)
plt.ylabel('Mean response times(ms)')
plt.xlabel('Engine')

for i, val in enumerate(average):
    plt.text(i, val + 0.1, f'{val:.2} ms', ha='center', fontweight='bold')

plt.tight_layout()
plt.show()