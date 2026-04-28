import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Simple Select"        # Decides the title

def extract_newman_memory_use(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    memory_use_list = [ex["memoryUse"] for ex in data]

    return memory_use_list

prisma_memory_use = extract_newman_memory_use("reports/Select/report-Prisma_SimpleSelect-100-16-19-20.json")
sequelize_memory_use = extract_newman_memory_use("reports/Select/report-Sequelize_SimpleSelect-100-14-32-05.json")
sql_memory_use = extract_newman_memory_use("reports/Select/report-SQL_SimpleSelect-100-14-30-11.json")

engines = ['Prisma', 'Pure-SQL', 'Sequelize']
all_memory = [prisma_memory_use, sql_memory_use, sequelize_memory_use]

plt.figure(figsize=(8, 6))
bp = plt.boxplot(all_memory, tick_labels=engines, patch_artist=True)

colors = ['#2E5F7F', '#D87741', '#2E5F7F']

for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)

plt.ylim(bottom=30, top=32)

plt.title(Title)
plt.ylabel('Mean memory use (MB)')
plt.xlabel('Engine')

plt.tight_layout()
plt.show()
