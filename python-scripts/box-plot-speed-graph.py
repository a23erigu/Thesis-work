import json
from statistics import mean

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy.stats as stats
import statsmodels.stats.api as sm

Title = "Advanced read"        # Decides the title

def extract_newman_times(filename):
    with open(filename, 'r') as f:
        data = json.load(f)

    times_list = [ex["responseTime"] for ex in data]

    return times_list

prisma_times = extract_newman_times("reports/Select/report-Prisma_AdvancedSelect-10000-16-42-06.json")
sequelize_times = extract_newman_times("reports/Select/report-Sequelize_AdvancedSelect-10000-15-24-00.json")
sql_times = extract_newman_times("reports/Select/report-SQL_AdvancedSelect-10000-15-39-57.json")

engines = ['Prisma', 'Pure-SQL', 'Sequelize']
all_time = [prisma_times, sql_times, sequelize_times]

plt.figure(figsize=(8, 6))
bp = plt.boxplot(all_time, tick_labels=engines, patch_artist=True, medianprops={"color": "#000000"})

colors = ['#41a2d8', '#D87741', '#57d841']

for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)

plt.ylim(bottom=0, top=26)

plt.title(Title)
plt.ylabel('Mean response times(ms)')
plt.xlabel('Query engine')

plt.tight_layout()
plt.show()
