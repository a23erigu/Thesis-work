import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

ORM = "Sequelize"       # Decides what ORM is being used
Title = "Simple select"        # Decides the title

def extract_newman_memory_use(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    memory_use_list = [ex["memoryUse"] for ex in data]

    return memory_use_list

orm_memory_use = extract_newman_memory_use("report-Sequelize_SimpleSelect-1001-17-07-36.json")
sql_memory_use = extract_newman_memory_use("report-SQL_SimpleSelect-1001-16-33-56.json")

mean_orm = mean(orm_memory_use)
mean_sql = mean(sql_memory_use)

orm_interval = stats.norm.interval(0.95, loc=np.mean(orm_memory_use), scale=stats.sem(orm_memory_use))
sql_interval = stats.norm.interval(0.95, loc=np.mean(sql_memory_use), scale=stats.sem(sql_memory_use))

print(ORM +  f" mean [{mean_orm:.3f}]")
print(ORM + f" 95% CI [{orm_interval[0]:.3f}, {orm_interval[1]:.3f}]")
print()
print(f"SQL mean [{mean_sql:.3f}]")
print(f"SQL 95% CI [{sql_interval[0]:.3f}, {sql_interval[1]:.3f}]")

engines = [ORM, 'pure-SQL']
average = [mean_orm, mean_sql]

plt.figure(figsize=(8, 6))
plt.bar(engines, average, color=['#2E5F7F', '#D87741'], alpha=1)

plt.ylim(bottom=0, top=12)

plt.title(Title)
plt.ylabel('Mean memory use (MB)')
plt.xlabel('Engine')

for i, val in enumerate(average):
    plt.text(i, val + 0.1, f'{val:.1} MB', ha='center', fontweight='bold')

plt.tight_layout()
plt.show()