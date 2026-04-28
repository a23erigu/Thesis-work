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

prisma_times = extract_newman_times("reports/Select/report-Prisma_SimpleSelect-100-16-19-20.json")
sequelize_times = extract_newman_times("reports/Select/report-Sequelize_SimpleSelect-100-14-32-05.json")
sql_times = extract_newman_times("reports/Select/report-SQL_SimpleSelect-100-14-30-11.json")

engines = ['Prisma', 'Pure-SQL', 'Sequelize']
all_time = [prisma_times, sql_times, sequelize_times]

plt.figure(figsize=(8, 6))
bp = plt.boxplot(all_time, tick_labels=engines, patch_artist=True)

colors = ['#2E5F7F', '#D87741', '#2E5F7F']

for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)

plt.ylim(bottom=0, top=8)

plt.title(Title)
plt.ylabel('Mean response times(ms)')
plt.xlabel('Engine')

plt.tight_layout()
plt.show()
